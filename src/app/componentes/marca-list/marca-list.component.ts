import { Component } from '@angular/core';
import {Marca} from '../../models/marca';
import {MarcaService} from '../../service/marca.service';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-marca-list',
  imports: [Button,
    Dialog,
    FormsModule,
    InputText,
    DropdownModule,
    ButtonDirective,
    Panel,
    TableModule,
    ReactiveFormsModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.css'
})
export class MarcaListComponent {
  novaMarca: Marca = {nome:''};
  marcaEditando: Marca = {nome:''};
  listaMarcas: Marca[] = [];

  mostrarDialogMarca = false;
  mostrarDialogEditarMarca = false;

  termoBusca: string = '';


  constructor(private marcaService:MarcaService) {
    this.marcaService.listarMarca().subscribe(marca => this.listaMarcas = marca);
  }

  onMarcaChange() {
    this.novaMarca = {nome:''};
    this.mostrarDialogMarca = true;
  }

  incluirMarca(){
    if(!this.novaMarca.nome.trim()){
      alert('O nome é obrigatório!')
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novaMarca);

    this.marcaService.incluirMarca(this.novaMarca).subscribe({
      next: (servico) => {
        console.log('Marca cadastrada com sucesso!');
        alert('Marca cadastrada com sucesso!');
        this.atualizarListaMarca();
        this.novaMarca = {
          nome: '',
        };
        this.mostrarDialogMarca = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe uma marca com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar marca.');
        }
      }
    });
  }
  atualizarListaMarca(): void {
    this.marcaService.listarMarca().subscribe(marca => {
      this.listaMarcas = marca;
    });
  }

  editarMarca(marca: Marca) {
    this.marcaEditando = { ...marca };
    this.mostrarDialogEditarMarca = true;
  }

  salvarEdicao() {
    if (!this.marcaEditando.id) {
      alert("ID do marca não encontrada para edição.");
      return;
    }

    this.marcaService.atualizarMarca(this.marcaEditando).subscribe({
      next: (marcaAtualizada) => {
        const index = this.listaMarcas.findIndex(f => f.id === marcaAtualizada.id);
        if (index !== -1) {
          this.listaMarcas[index] = marcaAtualizada;
        }
        this.mostrarDialogEditarMarca = false;
        alert("Marca atualizada com sucesso!");
      },
      error: (erro) => {
        alert("Erro ao atualizar a marca.");
        console.error("Erro ao salvar edição:", erro);
      }
    });
  }

  removerMarca(marca: Marca){
    if (marca.id === undefined) {
      alert("ID da marca não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover a marca "${marca.nome}"?`)) {
      this.marcaService.deletarMarcaById(marca.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaMarcas = this.listaMarcas.filter(m => m.id !== marca.id);
          alert('Marca removida com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover a marca.');
        }
      });
    }
  }

  get marcasFiltradas(): Marca[] {
    return this.listaMarcas.filter(marca =>
      !this.termoBusca ||
      [
        marca.nome?.toLowerCase() ?? '',
      ].some(valor =>
        valor.includes(this.termoBusca.toLowerCase())
      )
    );
  }

}
