import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {Peca} from '../../models/peca';
import {PecaService} from '../../service/peca.service';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Panel} from 'primeng/panel';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {Servico} from '../../models/servico';

@Component({
  selector: 'app-peca-list',
  imports: [TableModule, PaginatorModule, Button, Dialog, FormsModule, Panel, InputText, ButtonDirective, InputTextModule, ReactiveFormsModule],
  templateUrl: './peca-list.component.html',
  standalone: true,
  styleUrl: './peca-list.component.css'
})

export class PecaListComponent {
  novaPeca: Peca = {codigo:"", descricao:"", valorUnitario: 0, quantidade: 0 };
  pecaEditando: Peca = {codigo:"", descricao:"", valorUnitario: 0, quantidade: 0 };
  listaPecas: Peca[] = [];

  mostrarDialogPeca = false;
  mostrarDialogEditarPeca = false;

  termoBusca: string = '';

  constructor(private pecaService:PecaService) {
    this.pecaService.listarPeca().subscribe(peca => this.listaPecas = peca);
  }

  onPecaChange(){
    this.mostrarDialogPeca = true;
  }

  adicionarPeca(){
    if(!this.novaPeca.codigo.trim()){
      alert('O código é obrigatório!')
      return;
    }
    if(!this.novaPeca.descricao.trim()){
      alert('A descrição é obrigatória!')
      return;
    }
    if (
      this.novaPeca.quantidade === null ||
      this.novaPeca.quantidade === undefined ||
      isNaN(this.novaPeca.quantidade) ||
      this.novaPeca.quantidade <= 0
    ) {
      alert('A quantidade deve ser um número maior que zero!');
      return;
    }
    if (
      this.novaPeca.valorUnitario === null ||
      this.novaPeca.valorUnitario === undefined ||
      isNaN(this.novaPeca.valorUnitario) ||
      this.novaPeca.valorUnitario <= 0
    ) {
      alert('O valor unitário deve ser maior que zero!');
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novaPeca);

    this.pecaService.incluirPeca(this.novaPeca).subscribe({
      next: (peca) => {
        console.log('Peca cadastrada com sucesso!');
        alert('Peça cadastrada com sucesso!');
        this.atualizarListaPeca();
        this.novaPeca = {
          codigo: '',
          descricao: '',
          quantidade: 0,
          valorUnitario: 0
        };
        this.mostrarDialogPeca = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe uma Peça com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar peça.');
        }
      }
    });
  }

  atualizarListaPeca(): void {
    this.pecaService.listarPeca().subscribe(peca => {
      this.listaPecas = peca;
    });
  }

  removerPeca(peca: Peca) {
    if (peca.id === undefined) {
      alert("ID da peça não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover a peça "${peca.codigo}"?`)) {
      this.pecaService.deletarPecaById(peca.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaPecas = this.listaPecas.filter(g => g.id !== peca.id);
          alert('Peça removida com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover a peça.');
        }
      });
    }
  }

  editarPeca(peca: Peca) {
      this.pecaEditando = { ...peca }; // Cópia para edição segura
      this.mostrarDialogEditarPeca = true;
  }

  salvarEdicao() {
    if (!this.pecaEditando.id) {
      alert("ID da peça não encontrado para edição.");
      return;
    }

    this.pecaService.atualizarPeca(this.pecaEditando).subscribe({
      next: (pecaAtualizada) => {
        const index = this.listaPecas.findIndex(s => s.id === pecaAtualizada.id);
        if (index !== -1) {
          this.listaPecas[index] = pecaAtualizada;
        }
        this.mostrarDialogEditarPeca = false;
        alert("Peça atualizada com sucesso!");
      },
      error: (erro) => {
        alert("Erro ao atualizar a peça.");
        console.error("Erro ao salvar edição:", erro);
      }
    });
  }

  get pecasFiltradas(): Servico[] {
    return this.listaPecas.filter(peca =>
      !this.termoBusca ||
      [
        peca.codigo?.toLowerCase() ?? '',
        peca.descricao?.toLowerCase() ?? '',
      ].some(valor =>
        valor.includes(this.termoBusca.toLowerCase())
      )
    );
  }
}
