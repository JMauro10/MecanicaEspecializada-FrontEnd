import { Component } from '@angular/core';
import {Marca} from '../../models/marca';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {Modelo} from '../../models/modelo';
import {ModeloService} from '../../service/modelo.service';
import {MarcaService} from '../../service/marca.service';

@Component({
  selector: 'app-modelo-list',
  imports: [Button,
    Dialog,
    FormsModule,
    InputText,
    DropdownModule,
    ButtonDirective,
    Panel,
    TableModule,
    ReactiveFormsModule],
  templateUrl: './modelo-list.component.html',
  styleUrl: './modelo-list.component.css'
})
export class ModeloListComponent {
  novoModelo: Modelo = { nome: '', marca: { nome: '' } };
  modeloEditando: Modelo = { nome: '', marca: { nome: '' } };
  listaMarcas: Marca[] = [];
  listaModelos: Modelo[] = [];

  mostrarDialogModelo = false;
  mostrarDialogEditarModelo = false;

  termoBusca: string = '';


  constructor(private modeloService: ModeloService, private marcaService: MarcaService) {
    this.modeloService.listarModelo().subscribe(modelo => this.listaModelos = modelo);
    this.marcaService.listarMarca().subscribe(marcas => this.listaMarcas = marcas);
  }


  onModeloChange()  {
    this.novoModelo = { nome: '',  marca: { nome: '' } };
    this.mostrarDialogModelo = true;
  }

  incluirModelo(){
    if(!this.novoModelo.nome.trim()){
      alert('O nome é obrigatório!')
      return;
    }
    if (!this.novoModelo.marca || !this.novoModelo.marca.id) {
      alert('Selecione uma marca!');
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novoModelo);

    this.modeloService.incluirModelo(this.novoModelo).subscribe({
      next: (servico) => {
        console.log('Modelo cadastrado com sucesso!');
        alert('Modelo cadastrado com sucesso!');
        this.atualizarListaModelo();
        this.novoModelo = {
          nome: '',
          marca: { nome: '' }
        };
        this.mostrarDialogModelo = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um modelo com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar modelo.');
        }
      }
    });
  }
  atualizarListaModelo(): void {
    this.modeloService.listarModelo().subscribe(modelo => {
      this.listaModelos = modelo;
    });
  }

  editarModelo(modelo: Modelo) {
    const marcaSelecionada = this.listaMarcas.find(m => m.id === modelo.marca?.id);

    this.modeloEditando = {
      ...modelo,
      marca: marcaSelecionada ?? { nome: '' }
    };

    this.mostrarDialogEditarModelo = true;
  }

  salvarEdicao() {
    if (!this.modeloEditando.id) {
      alert("ID do modelo não encontrado para edição.");
      return;
    }
    if (!this.modeloEditando.marca || !this.modeloEditando.marca.id) {
      alert('Selecione uma marca!');
      return;
    }

    this.modeloService.atualizarModelo(this.modeloEditando).subscribe({
      next: (modeloAtualizado) => {
        const index = this.listaModelos.findIndex(m => m.id ===modeloAtualizado.id);
        if (index !== -1) {
          this.listaModelos[index] = modeloAtualizado;
        }
        this.mostrarDialogEditarModelo = false;
        alert("Modelo atualizado com sucesso!");
      },
      error: (erro) => {
        alert("Erro ao atualizar o modelo.");
        console.error("Erro ao salvar edição:", erro);
      }
    });
  }

  removerModelo(modelo: Modelo){
    if (modelo.id === undefined) {
      alert("ID do modelo não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o modelo "${modelo.nome}"?`)) {
      this.modeloService.deletarModeloById(modelo.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaModelos = this.listaModelos.filter(m => m.id !== modelo.id);
          alert('Modelo removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o Modelo.');
        }
      });
    }
  }

  get modelosFiltrados(): Modelo[] {
    return this.listaModelos.filter(marca =>
      !this.termoBusca ||
      [
        marca.nome?.toLowerCase() ?? '',
      ].some(valor =>
        valor.includes(this.termoBusca.toLowerCase())
      )
    );
  }

}
