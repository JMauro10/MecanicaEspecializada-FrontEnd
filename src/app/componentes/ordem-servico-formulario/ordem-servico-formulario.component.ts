import { Component } from '@angular/core';
import {OrdemServico} from '../../models/ordemservico';
import {OrdemServicoServico} from '../../models/ordemServicoServico';
import {Ordemservicopeca} from '../../models/ordemservicopeca';
import {OrdemservicoService} from '../../service/ordemservico.service';
import {ServicoService} from '../../service/servico.service';
import {PecaService} from '../../service/peca.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ordem-servico-formulario',
  imports: [],
  templateUrl: './ordem-servico-formulario.component.html',
  standalone: true,
  styleUrl: './ordem-servico-formulario.component.css'
})
export class OrdemServicoFormularioComponent {
  novaOrdemServico:OrdemServico = {cliente:{id:0,tipo:''},veiculo:{id:0},dataAbertura:'',dataFechamento:'',observacoes:''}
  editarOrdemServico:OrdemServico = {cliente:{id:0,tipo:''},veiculo:{id:0},dataAbertura:'',dataFechamento:'',observacoes:''}
  novoServico:OrdemServicoServico = {servicoId:0,ordemServicoId:0,quantidade:0};
  novaPeca:Ordemservicopeca = {pecaId:0,ordemServicoId:0,quantidade:0};


  constructor(private ordemServicoService:OrdemservicoService, private servicoService:ServicoService,
              private pecaService:PecaService, private router:Router) {
  }

  incluirOrdemServico(){

  }
}
