import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {VeiculoService} from '../../service/veiculo.service';
import {Veiculo} from '../../models/veiculo';
import {Peca} from '../../models/peca';
import {Marca} from '../../models/marca';
import {Modelo} from '../../models/modelo';


@Component({
  selector: 'app-veiculo-list',
  imports: [
    Button,
    Dialog,
    FormsModule,
    InputText,
    TableModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './veiculo-list.component.html',
  standalone: true,
  styleUrl: './veiculo-list.component.css'
})
export class VeiculoListComponent {

  marca: Marca = {}
  modelo: Modelo = {}
  // novoVeiculo: Veiculo = {marca: this.marca, modelo: this.modelo, valorUnitario: 0, quantidade: 0 };

  mostrarDialogVeiculo = false;

  constructor(private fb: FormBuilder, private veiculoService: VeiculoService) {}

  onVeiculoChange(){
    this.mostrarDialogVeiculo = true;
  }
  //
  // adicionarPeca(){
  //   if(!this.novaPeca.codigo.trim()){
  //     alert('O codigo é obrigatório!')
  //     return;
  //   }
  //   if(!this.novaPeca.descricao.trim()){
  //     alert('A descrição é obrigatória!')
  //     return;
  //   }
  //   if (
  //     this.novaPeca.quantidade === null ||
  //     this.novaPeca.quantidade === undefined ||
  //     isNaN(this.novaPeca.quantidade) ||
  //     this.novaPeca.quantidade <= 0
  //   ) {
  //     alert('A quantidade deve ser um número maior que zero!');
  //     return;
  //   }
  //   if (
  //     this.novaPeca.valorUnitario === null ||
  //     this.novaPeca.valorUnitario === undefined ||
  //     isNaN(this.novaPeca.valorUnitario) ||
  //     this.novaPeca.valorUnitario <= 0
  //   ) {
  //     alert('O valor unitário deve ser maior que zero!');
  //     return;
  //   }
  //   console.log('Dados do formulário antes do envio:', this.novaPeca);
  //
  //   this.pecaService.incluirPeca(this.novaPeca).subscribe({
  //     next: (peca) => {
  //       console.log('Peca cadastrada com sucesso!');
  //       alert('Peça cadastrada com sucesso!');
  //       this.atualizarListaPeca();
  //       this.novaPeca = {
  //         codigo: '',
  //         descricao: '',
  //         quantidade: 0,
  //         valorUnitario: 0
  //       };
  //       this.mostrarDialogPeca = false;
  //     },
  //     error: (erro) => {
  //       if (erro.status === 400 || erro.status === 409) {
  //         alert(erro.error?.message || 'Já existe uma Peça com esse nome!');
  //       } else {
  //         alert('Erro inesperado ao cadastrar peça.');
  //       }
  //     }
  //   });
  // }

}
