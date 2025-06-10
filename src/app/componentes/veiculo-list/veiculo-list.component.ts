import { Component } from '@angular/core';
import {Veiculo} from '../../models/veiculo';
import {Button, ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {IPessoaListaAdapter} from '../../adapter/ipessoa-lista-adapter';
import {DropdownModule} from 'primeng/dropdown';
import {VeiculoService} from '../../service/veiculo.service';


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
    DropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './veiculo-list.component.html',
  standalone: true,
  styleUrl: './veiculo-list.component.css'
})
export class VeiculoListComponent {


  constructor(private fb: FormBuilder, private veiculoService: VeiculoService) {}



}
