import { Component } from '@angular/core';
import {OrdemServico} from '../../models/ordemservico';
import {OrdemservicoService} from '../../service/ordemservico.service';
import {ServicoService} from '../../service/servico.service';
import {PecaService} from '../../service/peca.service';
import {Button, ButtonDirective} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-ordem-servico-list',
  imports: [
    ButtonDirective,
    Panel,
    TableModule,
    Button,
    RouterLink,
    NgIf
  ],
  templateUrl: './ordem-servico-list.component.html',
  standalone: true,
  styleUrl: './ordem-servico-list.component.css'
})
export class OrdemServicoListComponent {


  listaOrdemServicos:OrdemServico[] = [];

  constructor(private ordemServicoService:OrdemservicoService, private servicoService:ServicoService, private pecaService:PecaService) {
    this.ordemServicoService.listarOrdemSerivico().subscribe(ordemservico => this.listaOrdemServicos = ordemservico);
  }

  reabrirOrdemServico(ordemServico:OrdemServico){
    if (ordemServico.id === undefined) {
      alert("ID da ordem de serviço não encontrado. Não é possível reabri-lá.");
      return;
    }

    if (confirm(`Tem certeza que deseja reabrir a ordem de serviço "${ordemServico.id}"?`)) {
      this.ordemServicoService.reabrirOrdemServico(ordemServico.id).subscribe({
        next: () => {
          alert('Ordem de Serviço foi reaberta com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar reabrir a ordem de serviço.');
        }
      });
    }
  }

  cancelarOrdemServico(ordemServico:OrdemServico){
    if (ordemServico.id === undefined) {
      alert("ID da ordem de serviço não encontrado. Não é possível cancelar.");
      return;
    }
    if (confirm(`Tem certeza que deseja cancelar a ordem de serviço "${ordemServico.id}"?`)) {
      this.ordemServicoService.cancelarOrdemServico(ordemServico.id).subscribe({
        next: () => {
          alert('Ordem de Serviço foi cancelada com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar cancelar a ordem de serviço.');
        }
      });
    }
  }

  pagarOrdemServico(ordemServico:OrdemServico){
    if (ordemServico.id === undefined) {
      alert("ID da ordem de serviço não encontrado. Não é possível pagar.");
      return;
    }
    if (confirm(`Tem certeza que deseja pagar a ordem de serviço "${ordemServico.id}"?`)) {
      this.ordemServicoService.pagarOrdemServico(ordemServico.id).subscribe({
        next: () => {
          alert('Ordem de Serviço foi paga com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar pagar a ordem de serviço.');
        }
      });
    }

  }
}
