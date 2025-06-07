import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from 'primeng/api';
import {PessoaFisica} from '../../models/pessoaFisica';
import {PessoaJuridica} from '../../models/pessoaJuridica';
import {PessoaFisicaService} from '../../service/pessoaFisica.service';
import {PessoaJuridicaService} from '../../service/pessoaJuridica.service';
import {Button, ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-cliente-list',
  imports: [
    ReactiveFormsModule,
    SharedModule,
    Button,
    ButtonModule,
    Dialog,
    InputText,
    InputTextModule,
    DropdownModule,
    FormsModule,
    Panel,
    TableModule
  ],
  templateUrl: './cliente-list.component.html',
  standalone: true,
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent {

  mostrarDialogoPessoaFisica = false;
  mostrarDialogoPessoaJuridica = false;


  clientes = [
    { label: 'Pessoa Física', value: 'fisica' },
    { label: 'Pessoa Jurídica', value: 'juridica' }
  ];

  selecionarCliente: string | null = null;

  visible: boolean = false;
  exibeModalEdicao: boolean = false;
  form!: FormGroup;
  novoClienteFisica: PessoaFisica = {tipo: 'fisica', nome: '',email: '', telefone: '', cpf: '', dataNasc: new Date};
  novoClienteJuridica: PessoaJuridica = {tipo: 'juridica', nome: '',email: '', telefone: '',razaoSocial: '', cnpj: ''};
  listaClientesFisica: PessoaFisica[] = [];
  listaClientesJuridica: PessoaJuridica[] = [];

  abrirPopUp() {
    if (this.selecionarCliente === 'fisica') {
      // Lógica para abrir o popup de Pessoa Física
    } else if (this.selecionarCliente === 'juridica') {
      // Lógica para abrir o popup de Pessoa Jurídica
    }
  }

  constructor(private pessoaFisicaService: PessoaFisicaService, private pessoaJuridicaService: PessoaJuridicaService) {
    this.pessoaFisicaService.listarClienteFisica().subscribe(pessoaFisica => this.listaClientesFisica = pessoaFisica);
    this.pessoaJuridicaService.listarClienteJuridica().subscribe(pessoaJuridica => this.listaClientesJuridica = pessoaJuridica);
  }

  onClienteChange(clienteSelecionado: string) {
    if (clienteSelecionado === 'fisica') {
      this.mostrarDialogoPessoaFisica = true;
    } else if (clienteSelecionado === 'juridica') {
      this.mostrarDialogoPessoaJuridica = true;
    }
  }

  adicionarClienteFisica() {
    if(!this.novoClienteFisica.nome.trim()){
      alert('O nome é obrigatório!');
      return;
    }
    if(!this.novoClienteFisica.telefone.trim()){
      alert('O telefone é obrigatório!');
      return;
    }
    if(!this.novoClienteFisica.cpf.trim()){
      alert('O CPF é obrigatório!');
      return;
    }

    console.log('Dados do formulário antes do envio:', this.novoClienteFisica);

    this.pessoaFisicaService.incluirClienteFisica(this.novoClienteFisica).subscribe({
      next: (pessoaFisica) => {
        console.log('Cliente cadastrado com sucesso!');
        alert('Cliente cadastrado com sucesso!');
        this.atualizarListaClientesFisica(); // Atualiza a lista após o cadastro bem-sucedido
        // Aqui você reseta o objeto para limpar o formulário
        this.novoClienteFisica = {
          nome: '',
          tipo: 'fisica',
          email: '',
          telefone: '',
          cpf: '',
          dataNasc: new Date()
        };
        this.mostrarDialogoPessoaFisica = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um cliente com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar cliente.');
        }
      }
    });
  }

  atualizarListaClientesFisica(): void {
    this.pessoaFisicaService.listarClienteFisica().subscribe(pessoaFisica => {
      this.listaClientesFisica = pessoaFisica;
    });
  }


  adicionarClienteJuridica() {
    if(!this.novoClienteJuridica.nome.trim()){
      alert('O nome do responsável é obrigatório!');
      return;
    }
    if(!this.novoClienteJuridica.telefone.trim()){
      alert('O telefone é obrigatório!');
      return;
    }
    if(!this.novoClienteJuridica.razaoSocial.trim()){
      alert('A razão Social é obrigatória!');
      return;
    }
    if(!this.novoClienteJuridica.cnpj.trim()){
      alert('O CNPJ é obrigatório!');
      return;
    }

    console.log('Dados do formulário antes do envio:', this.novoClienteJuridica);

    this.pessoaJuridicaService.incluirClienteJuridica(this.novoClienteJuridica).subscribe({
      next: (pessoaJuridica) => {
        console.log('Cliente cadastrado com sucesso!');
        alert('Cliente cadastrado com sucesso!');
        this.atualizarListaClientesJuridica(); // Atualiza a lista após o cadastro bem-sucedido
        // Aqui você reseta o objeto para limpar o formulário
        this.novoClienteJuridica = {
          nome: '',
          tipo: 'juridica',
          email: '',
          telefone: '',
          razaoSocial: '',
          cnpj: ''
        };
        this.mostrarDialogoPessoaJuridica = false;
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um cliente com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar cliente.');
        }
      }
    });
  }

  atualizarListaClientesJuridica(): void {
    this.pessoaJuridicaService.listarClienteJuridica().subscribe(pessoaJuridica => {
      this.listaClientesJuridica = pessoaJuridica;
    });
  }

  removerClienteFisica(pessoaFisica: PessoaFisica) {
    if (pessoaFisica.id === undefined) {
      alert("ID do cliente não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o cliente "${pessoaFisica.nome}"?`)) {
      this.pessoaFisicaService.deletarClienteFisicaById(pessoaFisica.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaClientesFisica = this.listaClientesFisica.filter(g => g.id !== pessoaFisica.id);
          alert('Cliente removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o cliente.');
        }
      });
    }
  }

  removerClienteJuridica(pessoaJuridica: PessoaJuridica) {
    if (pessoaJuridica.id === undefined) {
      alert("ID do cliente não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o cliente "${pessoaJuridica.razaoSocial}"?`)) {
      this.pessoaJuridicaService.deletarClienteJuridicaById(pessoaJuridica.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaClientesJuridica = this.listaClientesJuridica.filter(g => g.id !== pessoaJuridica.id);
          alert('Cliente removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o cliente.');
        }
      });
    }
  }

}
