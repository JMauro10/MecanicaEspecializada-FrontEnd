import {Component} from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {Funcionario} from '../../models/funcionario';
import {FuncionarioService} from '../../service/funcionario.service';
import {InputMaskModule} from 'primeng/inputmask';

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
    ReactiveFormsModule,
    InputMaskModule
  ],
  templateUrl: './funcionario-list.component.html',
  standalone: true,
  styleUrl: './funcionario-list.component.css'
})
export class FuncionarioListComponent {
  novoFuncionario: Funcionario = {nome: '', cpf: ''};
  funcionarioEditando: Funcionario = {nome: '', cpf: ''};
  listaFuncionarios: Funcionario[] = [];

  mostrarDialogFuncionario = false;
  mostrarDialogEditarFuncionario = false;

  termoBusca: string = '';


  constructor(private funcionarioService: FuncionarioService) {
    this.funcionarioService.listarFuncionario().subscribe(funcionario => this.listaFuncionarios = funcionario);
  }

  onFuncionarioChange() {
    this.novoFuncionario = {nome: '', cpf: ''};
    this.mostrarDialogFuncionario = true;
  }

  incluirFuncionario() {
    if (!this.novoFuncionario.nome.trim()) {
      alert('O nome é obrigatório!')
      return;
    }
    if (!this.novoFuncionario.cpf.trim()) {
      alert('O cpf é obrigatório!')
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novoFuncionario);

    this.funcionarioService.incluirFuncionario(this.novoFuncionario).subscribe({
      next: (servico) => {
        console.log('Funcionário cadastrado com sucesso!');
        alert('Funcionário cadastrado com sucesso!');
        this.atualizarListaFuncionario();
        this.novoFuncionario = {
          nome: '',
          cpf: ''
        };
        this.mostrarDialogFuncionario = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um funcionário com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar funcionário.');
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
    this.funcionarioEditando = {...funcionario};
    this.mostrarDialogEditarFuncionario = true;
  }

  salvarEdicao() {
    if (!this.funcionarioEditando.id) {
      alert("ID do funcionário não encontrado para edição.");
      return;
    }

    this.funcionarioService.atualizarFuncionario(this.funcionarioEditando).subscribe({
      next: (funcionarioAtualizado) => {
        const index = this.listaFuncionarios.findIndex(f => f.id === funcionarioAtualizado.id);
        if (index !== -1) {
          this.listaFuncionarios[index] = funcionarioAtualizado;
        }
        this.mostrarDialogEditarFuncionario = false;
        alert("Funcinário atualizado com sucesso!");
      },
      error: (erro) => {
        alert("Erro ao atualizar o funcinário.");
        console.error("Erro ao salvar edição:", erro);
      }
    });
  }

  removerFuncionario(funcionario: Funcionario) {
    if (funcionario.id === undefined) {
      alert("ID do funcionário não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o funcionário "${funcionario.nome}"?`)) {
      this.funcionarioService.deletarFuncionarioById(funcionario.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaFuncionarios = this.listaFuncionarios.filter(g => g.id !== funcionario.id);
          alert('Funcionário removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o funcionário.');
        }
      });
    }
  }

  get funcionariosFiltrados(): Funcionario[] {
    return this.listaFuncionarios.filter(funcionario =>
      !this.termoBusca ||
      [
        funcionario.nome?.toLowerCase() ?? '',
        funcionario.cpf?.toString() ?? '',
      ].some(valor =>
        valor.includes(this.termoBusca.toLowerCase())
      )
    );
  }

}
