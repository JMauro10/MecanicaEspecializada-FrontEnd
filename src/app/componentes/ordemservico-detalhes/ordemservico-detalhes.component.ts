import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { OrdemservicoService } from '../../service/ordemservico.service';
import {Button, ButtonDirective} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {NgIf} from '@angular/common';
import {Ordemservicoresponsedto} from '../../models/ordemservicoresponsedto';
import {Servico} from '../../models/servico';
import {Peca} from '../../models/peca';
import {ServicoService} from '../../service/servico.service';
import {PecaService} from '../../service/peca.service';
import {DropdownModule} from 'primeng/dropdown';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {OrdemServicoServico} from '../../models/ordemServicoServico';
import {OrdemServicoServicoService} from '../../service/ordemServicoServico.service';
import {OrdemservicopecaService} from '../../service/ordemservicopeca.service';
import {Ordemservicopeca} from '../../models/ordemservicopeca';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-ordemservico-detalhes',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    Panel,
    NgIf,
    DropdownModule,
    FloatLabel,
    FormsModule,
    Dialog,
    InputText,
    TableModule,
    /* seus imports */],
  templateUrl: './ordemservico-detalhes.component.html',
  styleUrl: './ordemservico-detalhes.component.css'
})
export class OrdemservicoDetalhesComponent implements OnInit {
  mostrarDialogServico = false;
  mostrarDialogPeca = false;
  ordemServico!: Ordemservicoresponsedto;
  novoServico:OrdemServicoServico = {servicoId:0,ordemServicoId:0,quantidade:0}
  novaPeca:Ordemservicopeca = {pecaId:0,ordemServicoId:0,quantidade:0}
  servicos:Servico[] = [];
  pecas:Peca[] = [];
  servicoDaOS:OrdemServicoServico[]=[];
  pacaDaOS:Ordemservicopeca[]=[];
  constructor(
    private route: ActivatedRoute,
    private ordemServicoService: OrdemservicoService,
    private servicoService:ServicoService,
    private pecaService:PecaService,
    private servicoOrdemServicoService:OrdemServicoServicoService,
    private pacaOrdemServicoService:OrdemservicopecaService
  ) {
    this.servicoService.listarServico().subscribe(servico => this.servicos = servico);
    this.pecaService.listarPeca().subscribe(peca => this.pecas = peca);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ordemServicoService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.ordemServico = dados;
        this.carregarServicosDaOrdemServico(id);
        this.carregarPecasDaOrdemServico(id);
      },
      error: (erro) => console.error('Erro ao buscar ordem de serviço:', erro)
    });
  }

  carregarServicosDaOrdemServico(id: number): void {
    this.servicoOrdemServicoService.listarOrdemServicoServicoPorOSID(id).subscribe({
      next: (servicos) => {
        this.servicoDaOS = servicos;
      },
      error: (erro) => {
        console.error('Erro ao carregar serviços da OS:', erro);
      }
    });
  }

  carregarPecasDaOrdemServico(id: number): void {
    this.pacaOrdemServicoService.listarOrdemServicoPecaPorOSID(id).subscribe({
      next: (pecas) => {
        this.pacaDaOS = pecas;
      },
      error: (erro) => {
        console.error('Erro ao carregar peças da OS:', erro);
      }
    });
  }

  onServicoChange(){
    this.mostrarDialogServico = true;
  }

  onPecaChange(){
    this.mostrarDialogPeca = true;
  }

  adicionarServico() {
    if (this.novoServico.servicoId === null) {
      alert('O serviço é obrigatório!');
      return;
    }

    if (this.novoServico.quantidade === null || this.novoServico.quantidade <= 0) {
      alert('A quantidade deve ser maior que 0!');
      return;
    }

    this.novoServico.ordemServicoId = this.ordemServico.id!;
    console.log('Dados do formulário antes do envio:', this.novoServico);

    this.servicoOrdemServicoService.incluirOrdemServicoServico(this.novoServico).subscribe({
      next: () => {
        console.log('Serviço incluído com sucesso!');
        alert('Serviço incluído com sucesso!');
        this.atualizarListaDeServicosDaOs(); // Chamada corrigida
        this.novoServico = { servicoId: 0, ordemServicoId: 0, quantidade: 0 };
        this.mostrarDialogServico = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Erro de validação ao incluir o serviço!');
        } else {
          alert('Erro inesperado ao incluir serviço.');
        }
      }
    });
  }

  atualizarListaDeServicosDaOs(): void {
    this.servicoOrdemServicoService.listarOrdemServicoServicoPorOSID(this.ordemServico.id!).subscribe(servicos => {
      this.servicoDaOS = servicos;
    });
  }


  adicionarPeca() {
    if (this.novaPeca.pecaId === null) {
      alert('A peça é obrigatória!');
      return;
    }

    if (this.novaPeca.quantidade === null || this.novaPeca.quantidade <= 0) {
      alert('A quantidade deve ser maior que 0!');
      return;
    }

    this.novaPeca.ordemServicoId = this.ordemServico.id!;
    console.log('Dados do formulário antes do envio:', this.novaPeca);

    this.pacaOrdemServicoService.incluirOrdemSerivicoPeca(this.novaPeca).subscribe({
      next: () => {
        console.log('Peça incluída com sucesso!');
        alert('Peça incluída com sucesso!');
        this.atualizarListaDePecasDaOs(); // Chamada corrigida
        this.novaPeca = { pecaId: 0, ordemServicoId: 0, quantidade: 0 };
        this.mostrarDialogPeca = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Erro de validação ao incluir a peça!');
        } else {
          alert('Erro inesperado ao incluir peça.');
        }
      }
    });
  }

  atualizarListaDePecasDaOs(): void {
    this.pacaOrdemServicoService.listarOrdemServicoPecaPorOSID(this.ordemServico.id!).subscribe(pecas => {
      this.pacaDaOS = pecas;
    });
  }

}
