import { Component } from '@angular/core';
import {Veiculo} from '../../models/veiculo';
import {VeiculoService} from '../../service/veiculo.service';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {Funcionario} from '../../models/funcionario';

@Component({
  selector: 'app-veiculo-list',
  imports: [
    Button,
    ButtonDirective,
    Dialog,
    FormsModule,
    InputText,
    Panel,
    TableModule
  ],
  templateUrl: './veiculo-list.component.html',
  standalone: true,
  styleUrl: './veiculo-list.component.css'
})
export class VeiculoListComponent {

  mostrarDialogoVeiculo = false;
  novoVeiculo: Veiculo = {marca:'',modelo:'',ano:1111,placa:'',quilomentragem:1,idCliente:0};
  listaVeiculos: Veiculo[] = [];


  constructor(private veiculoService:VeiculoService) {
    this.veiculoService.listarVeiculo().subscribe(veiculo => this.listaVeiculos = veiculo);
  }

  onVeiculoChange(){
    this.mostrarDialogoVeiculo = true;
  }

  incluirVeiculo(){
    if(!this.novoVeiculo.marca.trim()){
      alert('A marca é obrigatório!');
      return;
    }
    if(!this.novoVeiculo.modelo.trim()){
      alert('O modelo é obrigatório!')
      return;
    }
    if(this.novoVeiculo.ano === null){
      alert('O ano é obrigatório!')
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novoVeiculo);

    this.veiculoService.incluirVeiculo(this.novoVeiculo).subscribe({
      next: (pessoaFisica) => {
        console.log('Funcionario cadastrado com sucesso!');
        alert('Funcionario cadastrado com sucesso!');
        this.atualizarListaVeiculo();
        this.novoVeiculo = {
          marca:'',
          modelo:'',
          ano:1111,
          placa:'',
          quilomentragem:1,
          idCliente:0
        };
        this.mostrarDialogoVeiculo = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um Veiculo com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar veiculo.');
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
      alert("ID do veiculo não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o veiculo "${veiculo.modelo}"?`)) {
      this.veiculoService.deletarVeiculoById(veiculo.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaVeiculos = this.listaVeiculos.filter(g => g.id !== veiculo.id);
          alert('Veiculo removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o veiculo.');
        }
      });
    }
  }
}
