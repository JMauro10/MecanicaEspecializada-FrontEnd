import { Component } from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
    TableModule,
    ReactiveFormsModule
  ],
  templateUrl: './funcionario-list.component.html',
  standalone: true,
  styleUrl: './funcionario-list.component.css'
})
export class FuncionarioListComponent {

  novoFuncionario: any = {};
  funcionarioEditando: any = {};

  mostrarDialogoFuncionario = false;
  mostrarDialogoEditarFuncionario = false;

  listaFuncionarios: any[] = [];

  onFuncionarioChange() {
    this.novoFuncionario = {};
    this.mostrarDialogoFuncionario = true;
  }

  incluirFuncionario() {
    const novo = {
      ...this.novoFuncionario,
      id: this.listaFuncionarios.length + 1
    };
    this.listaFuncionarios.push(novo);
    this.mostrarDialogoFuncionario = false;
  }

  editarFuncionario(funcionario: any) {
    this.funcionarioEditando = { ...funcionario }; // Cópia para edição segura
    this.mostrarDialogoEditarFuncionario = true;
  }

  salvarEdicao() {
    const index = this.listaFuncionarios.findIndex(f => f.id === this.funcionarioEditando.id);
    if (index !== -1) {
      this.listaFuncionarios[index] = { ...this.funcionarioEditando };
    }
    this.mostrarDialogoEditarFuncionario = false;
  }

  removerFuncionario(funcionario: any) {
    this.listaFuncionarios = this.listaFuncionarios.filter(f => f.id !== funcionario.id);
  }


}
