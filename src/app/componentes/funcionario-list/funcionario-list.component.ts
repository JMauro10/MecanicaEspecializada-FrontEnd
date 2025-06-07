import { Component } from '@angular/core';
import {Funcionario} from '../../models/funcionario';
import {FuncionarioService} from '../../service/funcionario.service';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-funcionario-list',
  imports: [
    Button,
    Dialog,
    FormsModule,
    InputText,
    DropdownModule,
    ButtonDirective,
    Panel,
    TableModule
  ],
  templateUrl: './funcionario-list.component.html',
  standalone: true,
  styleUrl: './funcionario-list.component.css'
})
export class FuncionarioListComponent {

  mostrarDialogoFuncionario = false;
  novoFuncionario: Funcionario = {nome:"",cpf:""};
  listaFuncionarios: Funcionario[] = [];

  constructor(private funcionarioService:FuncionarioService) {
    this.funcionarioService.listarFuncionario().subscribe(funcionario => this.listaFuncionarios = funcionario);
  }

  onFuncionarioChange(){
    this.mostrarDialogoFuncionario = true;
  }

  incluirFuncionario(){
    if(!this.novoFuncionario.nome.trim()){
      alert('O nome é obrigatório!');
      return;
    }
    if(!this.novoFuncionario.cpf.trim()){
      alert('O CPF é obrigatório!')
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novoFuncionario);

    this.funcionarioService.incluirFuncionario(this.novoFuncionario).subscribe({
      next: (funcionario) => {
        console.log('Funcionario cadastrado com sucesso!');
        alert('Funcionario cadastrado com sucesso!');
        this.atualizarListaFuncionario();
        this.novoFuncionario = {
          nome: '',
          cpf: ''
        };
        this.mostrarDialogoFuncionario = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um Funcionario com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar funcionario.');
        }
      }
    });
  }

  atualizarListaFuncionario(): void {
    this.funcionarioService.listarFuncionario().subscribe(funcionario => {
      this.listaFuncionarios = funcionario;
    });
  }

  removerFuncionario(funcionario: Funcionario) {
    if (funcionario.id === undefined) {
      alert("ID do funcionario não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o funcionario "${funcionario.nome}"?`)) {
      this.funcionarioService.deletarFuncionarioById(funcionario.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaFuncionarios = this.listaFuncionarios.filter(g => g.id !== funcionario.id);
          alert('Funcionario removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o funcionario.');
        }
      });
    }
  }
}
