import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {Panel} from 'primeng/panel';
import {Servico} from '../../models/servico';
import {ServicoService} from '../../service/servico.service';

@Component({
  selector: 'app-servico-list',
  imports: [TableModule, PaginatorModule, Button, Dialog, FormsModule, Panel, ButtonDirective],
  templateUrl: './servico-list.component.html',
  styleUrl: './servico-list.component.css'
})
export class ServicoListComponent {
  mostrarDialogServico = false;
  novoServico: Servico = {descricao:"",valorUnitario:0 };
  listaServicos: Servico[] = [];

  constructor(private servicoService:ServicoService) {
    this.servicoService.listarServico().subscribe(servico => this.listaServicos = servico);
  }

  onServicoChange(){
    this.mostrarDialogServico = true;
  }

  adicionarServico(){
    if(!this.novoServico.descricao.trim()){
      alert('A descrição é obrigatória!')
      return;
    }
    if (
      this.novoServico.valorUnitario === null ||
      this.novoServico.valorUnitario === undefined ||
      isNaN(this.novoServico.valorUnitario) ||
      this.novoServico.valorUnitario <= 0
    ) {
      alert('O valor unitário deve ser maior que zero!');
      return;
    }
    console.log('Dados do formulário antes do envio:', this.novoServico);

    this.servicoService.incluirServico(this.novoServico).subscribe({
      next: (servico) => {
        console.log('Servico cadastrado com sucesso!');
        alert('Serviço cadastrado com sucesso!');
        this.atualizarListaServico();
        this.novoServico = {
          descricao: '',
          valorUnitario: 0
        };
        this.mostrarDialogServico = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um serviço com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar serviço.');
        }
      }
    });
  }

  atualizarListaServico(): void {
    this.servicoService.listarServico().subscribe(servico => {
      this.listaServicos = servico;
    });
  }

  removerServico(servico: Servico){
    if (servico.id === undefined) {
      alert("ID do serviço não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o servico "${servico.descricao}"?`)) {
      this.servicoService.deletarServicoById(servico.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaServicos = this.listaServicos.filter(g => g.id !== servico.id);
          alert('Serviço removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o serviço.');
        }
      });
    }
  }
}
