import { Component } from '@angular/core';
import {OrdemServico} from '../../models/ordemservico';
import {OrdemServicoServico} from '../../models/ordemServicoServico';
import {OrdemservicoService} from '../../service/ordemservico.service';
import {Servico} from '../../models/servico';
import {Ordemservicopeca} from '../../models/ordemservicopeca';
import {ServicoService} from '../../service/servico.service';
import {PecaService} from '../../service/peca.service';
import {Peca} from '../../models/peca';
import {ButtonDirective} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-ordem-servico-list',
  imports: [
    ButtonDirective,
    Panel,
    TableModule
  ],
  templateUrl: './ordem-servico-list.component.html',
  standalone: true,
  styleUrl: './ordem-servico-list.component.css'
})
export class OrdemServicoListComponent {

  novaOrdemServico:OrdemServico = {cliente:{id:0,tipo:''},veiculo:{id:0},dataAbertura:'',dataFechamento:'',observacoes:''}
  editarOrdemServico:OrdemServico = {cliente:{id:0,tipo:''},veiculo:{id:0},dataAbertura:'',dataFechamento:'',observacoes:''}
  novoServico:OrdemServicoServico = {servicoId:0,ordemServicoId:0,quantidade:0};
  novaPeca:Ordemservicopeca = {pecaId:0,ordemServicoId:0,quantidade:0};
  listaOrdemServicos:OrdemServico[] = [];
  listaServicos:Servico[] = [];

  constructor(private ordemServicoService:OrdemservicoService, private servicoService:ServicoService, private pecaService:PecaService) {
    this.ordemServicoService.listarOrdemSerivico().subscribe(ordemservico => this.listaOrdemServicos = ordemservico);
  }

  removerOrdemServico(ordemServico:OrdemServico){
    if (ordemServico.id === undefined) {
      alert("ID da ordem de serviço não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover a ordem de serviço "${ordemServico.id}"?`)) {
      this.ordemServicoService.deletarOrdemSerivicoById(ordemServico.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaOrdemServicos = this.listaOrdemServicos.filter(g => g.id !== ordemServico.id);
          alert('Ordem de Serviço removida com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover a ordem de serviço.');
        }
      });
    }
  }
}
