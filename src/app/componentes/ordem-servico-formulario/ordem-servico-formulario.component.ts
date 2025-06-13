import { Component } from '@angular/core';
import {OrdemServico} from '../../models/ordemservico';
import {OrdemServicoServico} from '../../models/ordemServicoServico';
import {Ordemservicopeca} from '../../models/ordemservicopeca';
import {OrdemservicoService} from '../../service/ordemservico.service';
import {ServicoService} from '../../service/servico.service';
import {PecaService} from '../../service/peca.service';
import {Router, RouterLink} from '@angular/router';
import {Panel} from 'primeng/panel';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {DatePicker} from 'primeng/datepicker';
import {IftaLabel} from 'primeng/iftalabel';
import {Veiculo} from '../../models/veiculo';
import {VeiculoService} from '../../service/veiculo.service';
import {Cliente} from '../../models/Cliente';
import {ClienteService} from '../../service/cliente.service';

@Component({
  selector: 'app-ordem-servico-formulario',
  imports: [
    Panel,
    FloatLabel,
    FormsModule,
    Button,
    DropdownModule,
    DatePicker,
    IftaLabel,
    RouterLink
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
  clientes:Cliente[] = [];
  veiculos:Veiculo[] = [];



  constructor(private ordemServicoService:OrdemservicoService, private router:Router, private veiculoService:VeiculoService, private clienteService:ClienteService) {
    this.veiculoService.listarVeiculo().subscribe(veiculo => this.veiculos = veiculo);
    this.clienteService.listarClientes().subscribe(cliente => this.clientes = cliente);
  }

  incluirOrdemServico(){
    this.ordemServicoService.incluirOrdemSerivico(this.novaOrdemServico).subscribe(() => this.router.navigateByUrl('/ordemServico-list'));
  }
}
