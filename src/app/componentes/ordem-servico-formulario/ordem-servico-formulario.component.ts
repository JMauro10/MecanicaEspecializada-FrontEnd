import { Component } from '@angular/core';
import {OrdemServico} from '../../models/ordemservico';
import {OrdemServicoServico} from '../../models/ordemServicoServico';
import {Ordemservicopeca} from '../../models/ordemservicopeca';
import {OrdemservicoService} from '../../service/ordemservico.service';
import {ServicoService} from '../../service/servico.service';
import {PecaService} from '../../service/peca.service';
import {Router} from '@angular/router';
import {Panel} from 'primeng/panel';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {DatePicker} from 'primeng/datepicker';
import {IftaLabel} from 'primeng/iftalabel';

@Component({
  selector: 'app-ordem-servico-formulario',
  imports: [
    Panel,
    FloatLabel,
    FormsModule,
    InputText,
    Button,
    DropdownModule,
    DatePicker,
    IftaLabel
  ],
  templateUrl: './ordem-servico-formulario.component.html',
  standalone: true,
  styleUrl: './ordem-servico-formulario.component.css'
})
export class OrdemServicoFormularioComponent {
  novaOrdemServico: OrdemServico = {
    cliente: { id: 0, tipo: '' },
    veiculo: { id: 0 },
    dataAbertura: '',
    dataFechamento: '',
    observacoes: ''
  };
  clientes = [{ id: 1, nome: 'João Silva', tipo: 'FISICO' }, { id: 2, nome: 'Empresa XPTO', tipo: 'JURIDICO' }];
  veiculos = [{ id: 1, marca: 'Ford', modelo: 'F250' }, { id: 2, marca: 'Volksvagem', modelo: 'Polo' }];
  editarOrdemServico:OrdemServico = {cliente:{id:0,tipo:''},veiculo:{id:0},dataAbertura:'',dataFechamento:'',observacoes:''}
  novoServico:OrdemServicoServico = {servicoId:0,ordemServicoId:0,quantidade:0};
  novaPeca:Ordemservicopeca = {pecaId:0,ordemServicoId:0,quantidade:0};


  constructor(private ordemServicoService:OrdemservicoService, private router:Router) {
  }

  incluirOrdemServico(){
    this.ordemServicoService.incluirOrdemSerivico(this.novaOrdemServico).subscribe(() => this.router.navigateByUrl('/ordemServico-list'));
  }
}
