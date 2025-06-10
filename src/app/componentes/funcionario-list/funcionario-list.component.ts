import { Component } from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {Funcionario} from '../../models/funcionario';
import {FuncionarioService} from '../../service/funcionario.service';
import {Servico} from '../../models/servico';

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
    TableModule,
    ReactiveFormsModule
  ],
  templateUrl: './funcionario-list.component.html',
  standalone: true,
  styleUrl: './funcionario-list.component.css'
})
export class FuncionarioListComponent {

  novoFuncionario: Funcionario = {nome:'',cpf:''};
  funcionarioEditando: Funcionario = {nome:'',cpf:''};

  mostrarDialogoFuncionario = false;
  mostrarDialogoEditarFuncionario = false;

  listaFuncionarios: Funcionario[] = [];


  constructor(private funcionarioService:FuncionarioService) {
    this.funcionarioService.listarFuncionario().subscribe(funcionario => this.listaFuncionarios = funcionario);
  }

  onFuncionarioChange() {
    this.novoFuncionario = {nome:'',cpf:''};
    this.mostrarDialogoFuncionario = true;
  }

  incluirFuncionario(){
    if(!this.novoFuncionario.nome.trim()){
      alert('O nome é obrigatório!')
      return;
    }
    if(!this.novoFuncionario.cpf.trim()){
      alert('O cpf é obrigatório!')
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novoFuncionario);

    this.funcionarioService.incluirFuncionario(this.novoFuncionario).subscribe({
      next: (servico) => {
        console.log('Servico cadastrado com sucesso!');
        alert('Serviço cadastrado com sucesso!');
        this.atualizarListaFuncionario();
        this.novoFuncionario = {
          nome: '',
          cpf: ''
        };
        this.mostrarDialogoFuncionario = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um funcionario com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar serviço.');
        }
      }
    });
  }
  atualizarListaFuncionario(): void {
    this.funcionarioService.listarFuncionario().subscribe(funcionario => {
      this.listaFuncionarios = funcionario;
    });
  }

  editarFuncionario(funcionario: Funcionario) {
    this.funcionarioEditando = { ...funcionario };
    this.mostrarDialogoEditarFuncionario = true;
  }

  salvarEdicao() {
    if (!this.funcionarioEditando || !this.funcionarioEditando.id) {
      return;
    }

    this.funcionarioService.atualizarFuncionario(this.funcionarioEditando).subscribe({
      next: (funcionarioAtualizado) => {
        const index = this.listaFuncionarios.findIndex(f => f.id === funcionarioAtualizado.id);
        if (index !== -1) {
          this.listaFuncionarios[index] = funcionarioAtualizado;
        }
        this.mostrarDialogoEditarFuncionario = false;
      },
      error: (erro) => {
        console.error('Erro ao atualizar funcionário:', erro);
        // Aqui você pode exibir uma mensagem de erro ao usuário, se quiser
      }
    });
  }

  removerFuncionario(funcionario: Funcionario){
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
