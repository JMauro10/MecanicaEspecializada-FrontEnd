import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { OrdemservicoService } from '../../service/ordemservico.service';
import {Button} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {NgIf} from '@angular/common';
import {OrdemServicoResponseDTO} from '../../models/ordem-servico-response-dto';
import {Servico} from '../../models/servico';
import {Peca} from '../../models/peca';
import {ServicoService} from '../../service/servico.service';
import {PecaService} from '../../service/peca.service';
import {DatePicker} from 'primeng/datepicker';
import {DropdownModule} from 'primeng/dropdown';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {IftaLabel} from 'primeng/iftalabel';
import {PrimeTemplate} from 'primeng/api';
import {OrdemServicoServico} from '../../models/ordemServicoServico';
import {OrdemServicoServicoService} from '../../service/ordemServicoServico.service';
import {OrdemservicopecaService} from '../../service/ordemservicopeca.service';
import {Ordemservicopeca} from '../../models/ordemservicopeca';
import {Dialog} from 'primeng/dialog';
import {Textarea} from 'primeng/textarea';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-ordemservico-detalhes',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    Panel,
    NgIf,
    DatePicker,
    DropdownModule,
    FloatLabel,
    FormsModule,
    IftaLabel,
    PrimeTemplate,
    Dialog,
    Textarea,
    InputText,
    /* seus imports */],
  templateUrl: './ordemservico-detalhes.component.html',
  styleUrl: './ordemservico-detalhes.component.css'
})
export class OrdemservicoDetalhesComponent implements OnInit {
  mostrarDialogServico = false;
  mostrarDialogPeca = false;
  ordemServico!: OrdemServicoResponseDTO;
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
      next: (dados) => this.ordemServico = dados,
      error: (erro) => console.error('Erro ao buscar ordem de serviço:', erro)
    });
  }

  onServicoChange(){
    this.mostrarDialogServico = true;
  }

  onPecaChange(){
    this.mostrarDialogPeca = true;
  }

  adicionarServico(){
    if(this.novoServico.servicoId === null){
      alert('O servico é obrigatório!')
      return;
    }
    if(this.novoServico.quantidade === null){
      alert('A quantidade deve ser maior que 0!')
    }
    this.novoServico.ordemServicoId = this.ordemServico.id!;
    console.log('Dados do formulário antes do envio:', this.novoServico);

    this.servicoOrdemServicoService.incluirOrdemServicoServico(this.novoServico).subscribe({
      next: (peca) => {
        console.log('Servico incluido com sucesso!');
        alert('Servico incluido com sucesso!');
        this.atualizarListaDeServicosDaOs();
        this.novoServico = {
          servicoId: 0,
          ordemServicoId:0,
          quantidade: 0

        };
        this.mostrarDialogServico = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe uma incluido com esse nome!');
        } else {
          alert('Erro inesperado ao incluido servico.');
        }
      }
    });
  }

  atualizarListaDeServicosDaOs(): void {
    this.servicoOrdemServicoService.listarOrdemServicoServico().subscribe(servicoDaOs => {
      this.servicoDaOS = servicoDaOs;
    });
  }

  adicionarPeca(){
    if(this.novaPeca.pecaId === null){
      alert('A peca é obrigatório!')
      return;
    }
    if(this.novaPeca.quantidade === null){
      alert('A quantidade deve ser maior que 0!')
    }
    this.novaPeca.ordemServicoId = this.ordemServico.id!;
    console.log('Dados do formulário antes do envio:', this.novaPeca);

    this.pacaOrdemServicoService.incluirOrdemSerivicoPeca(this.novaPeca).subscribe({
      next: (peca) => {
        console.log('Peca incluido com sucesso!');
        alert('Peca incluido com sucesso!');
        this.atualizarListaDePecasDaOs();
        this.novaPeca = {
          pecaId: 0,
          ordemServicoId:0,
          quantidade: 0

        };
        this.mostrarDialogPeca = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe uma incluido com esse nome!');
        } else {
          alert('Erro inesperado ao incluido peca.');
        }
      }
    });
  }

  atualizarListaDePecasDaOs(): void {
    this.pacaOrdemServicoService.listarOrdemSerivicoPeca().subscribe(pacasDaOs => {
      this.pacaDaOS = pacasDaOs;
    });
  }
}
