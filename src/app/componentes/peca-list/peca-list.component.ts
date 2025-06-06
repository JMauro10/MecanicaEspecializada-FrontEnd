import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {Peca} from '../../models/peca';
import {PecaService} from '../../service/peca.service';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {Panel} from 'primeng/panel';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-peca-list',
  imports: [TableModule, PaginatorModule, Button, Dialog, FormsModule, Panel, InputText],
  templateUrl: './peca-list.component.html',
  standalone: true,
  styleUrl: './peca-list.component.css'
})

export class PecaListComponent {
  mostrarDialogPeca = false;
  novaPeca: Peca = {codigo:"",descricao:"",valorUnitario:0,quantidade:0 };
  listaPecas: Peca[] = [];

  constructor(private pecaService:PecaService) {
    this.pecaService.listarPeca().subscribe(peca => this.listaPecas = peca);
  }

  onPecaChange(){
    this.mostrarDialogPeca = true;
  }

  adicionarPeca(){
    if(!this.novaPeca.codigo.trim()){
      alert('O codigo é obrigatório!')
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
}
