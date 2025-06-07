import { Component } from '@angular/core';
import {Veiculo} from '../../models/veiculo';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {IPessoaListaAdapter} from '../../adapter/ipessoa-lista-adapter';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-veiculo-list',
  imports: [
    Button,
    ButtonDirective,
    Dialog,
    FormsModule,
    InputText,
    Panel,
    TableModule,
    DropdownModule
  ],
  templateUrl: './veiculo-list.component.html',
  standalone: true,
  styleUrl: './veiculo-list.component.css'
})
export class VeiculoListComponent {

  mostrarDialogoVeiculo = false;
  novoVeiculo: Veiculo = {
    marca: '',
    modelo: '',
    placa: '',
    ano: new Date().getFullYear(),
    quilomentragem: 0,
    idCliente: 0
  };

  listaVeiculos: Veiculo[] = [];
  listaClientes: IPessoaListaAdapter[] = [];

  constructor() {}

  onVeiculoChange(): void {
    this.mostrarDialogoVeiculo = true;
  }

  incluirVeiculo(): void {
    this.listaVeiculos.push({ ...this.novoVeiculo });
    this.novoVeiculo = {
      marca: '',
      modelo: '',
      placa: '',
      ano: new Date().getFullYear(),
      quilomentragem: 0,
      idCliente: 0
    };
    this.mostrarDialogoVeiculo = false;
  }

  removerVeiculo(veiculo: Veiculo): void {
    this.listaVeiculos = this.listaVeiculos.filter(v => v !== veiculo);
  }

  getNomeCliente(idCliente: number): string {
    const cliente = this.listaClientes.find(c => c.id === idCliente);
    return cliente ? cliente.nomeResponsavel : 'Desconhecido';
  }
}
