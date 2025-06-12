import { Component } from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {VeiculoService} from '../../service/veiculo.service';
import {Marca} from '../../models/marca';
import {Modelo} from '../../models/modelo';
import {Veiculo} from '../../models/veiculo';

import {Panel} from 'primeng/panel';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {ModeloService} from '../../service/modelo.service';
import {MarcaService} from '../../service/marca.service';
import {PessoaFisicaResposta} from '../../models/pessoa-fisica';
import {PessoaJuridicaResposta} from '../../models/pessoa-juridica';
import {ClienteService} from '../../service/cliente.service';


@Component({
  selector: 'app-veiculo-list',
  imports: [
    Button,
    FormsModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    Panel,
    Dialog,
    InputText,
    ButtonDirective,
    InputText,
  ],
  templateUrl: './veiculo-list.component.html',
  standalone: true,
  styleUrl: './veiculo-list.component.css'
})
export class VeiculoListComponent {
  marca: Marca = {nome: ''}
  modelo: Modelo = {nome: '', marca: this.marca}
  novoVeiculo: Veiculo = {marca: this.marca, modelo: this.modelo,ano: 0, placa: '', quilometragem: 0, clienteId: 0};
  veiculoEditando: Veiculo = {marca: this.marca, modelo: this.modelo,ano: 0, placa: '', quilometragem: 0, clienteId: 0};
  listaVeiculos: Veiculo[] = [];
  listaMarcas: Marca[] = [];
  listaModelos: Modelo[] = [];
  listaClientes: (PessoaFisicaResposta | PessoaJuridicaResposta)[] = [];

  mostrarDialogVeiculo = false;
  mostrarDialogEditarVeiculo = false;

  termoBusca: string = '';

  constructor(private clienteService: ClienteService, private fb: FormBuilder, private veiculoService: VeiculoService, private modeloService: ModeloService, private marcaService: MarcaService) {
    this.modeloService.listarModelo().subscribe(modelo => this.listaModelos = modelo);
    this.marcaService.listarMarca().subscribe(marcas => this.listaMarcas = marcas);
    this.clienteService.listarClientes().subscribe(clientes => this.listaClientes = clientes);
  }

  ngOnInit() {
    this.veiculoService.listarVeiculo().subscribe({
      next: (data) => {
        this.listaVeiculos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar veículos', err);
      }
    });
  }

  onVeiculoChange(){
    this.mostrarDialogVeiculo = true;
  }

  adicionarVeiculo(){
    if(!this.novoVeiculo.placa.trim()){
      alert('A placa é obrigatória!')
      return;
    }

    this.veiculoService.incluirVeiculo(this.novoVeiculo).subscribe({
      next: (veiculo) => {
        console.log('Veículo cadastrado com sucesso!');
        alert('Veículo cadastrado com sucesso!');
        this.atualizarListaVeiculo();
        this.novoVeiculo = {
          marca: { nome: '' },
          modelo: { nome: '', marca: { nome: '' } },
          ano: 0,
          placa: '',
          quilometragem: 0,
          clienteId: 0
        };
        this.mostrarDialogVeiculo = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um veículo com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar veículo.');
        }
      }
    });
  }

  atualizarListaVeiculo(): void {
    this.veiculoService.listarVeiculo().subscribe(veiculo => {
      this.listaVeiculos = veiculo;
    });
  }

  removerVeiculo(veiculo: Veiculo) {
    if (veiculo.id === undefined) {
      alert("ID do veículo não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o veículo?`)) {
      this.veiculoService.deletarVeiculoById(veiculo.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaVeiculos = this.listaVeiculos.filter(g => g.id !== veiculo.id);
          alert('Veículo removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o veículo.');
        }
      });
    }
  }

  editarVeiculo(veiculo: Veiculo) {
    this.veiculoEditando = { ...veiculo }; // Cópia para edição segura
    this.mostrarDialogEditarVeiculo = true;
  }

  salvarEdicao() {
    if (!this.veiculoEditando.id) {
      alert("ID do veículo não encontrado para edição.");
      return;
    }

    this.veiculoService.atualizarVeiculo(this.veiculoEditando).subscribe({
      next: (veiculoAtualizado) => {
        const index = this.listaVeiculos.findIndex(v => v.id === veiculoAtualizado.id);
        if (index !== -1) {
          this.listaVeiculos[index] = veiculoAtualizado;
        }
        this.mostrarDialogEditarVeiculo= false;
        alert("Veículo atualizado com sucesso!");
      },
      error: (erro) => {
        alert("Erro ao atualizar o veículo.");
        console.error("Erro ao salvar edição:", erro);
      }
    });
  }

  // Buscar o nome do cliente através do ID para exibição na tabela
  getNomeClientePorId(clienteId: number): string {
    const cliente = this.listaClientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Desconhecido';
  }

  get veiculosFiltrados(): Veiculo[] {
    return this.listaVeiculos.filter( veiculo =>
      !this.termoBusca ||
      [
        veiculo.placa?.toLowerCase() ?? '',
        veiculo.modelo.marca.nome?.toLowerCase() ?? '',
        veiculo.modelo.nome?.toLowerCase() ?? '',
        this.getNomeClientePorId(veiculo.clienteId)?.toLowerCase() ?? '',
        veiculo.ano?.toString() ?? '',
      ].some(valor =>
        valor.includes(this.termoBusca.toLowerCase())
      )
    );
  }

}
