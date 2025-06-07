import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {IPessoaListaAdapter} from '../../adapter/ipessoa-lista-adapter';
import {PessoaFisicaAdapter} from '../../adapter/PessoaFisicaAdapter';
import {PessoaJuridicaAdapter} from '../../adapter/PessoaJuridicaAdapter';
import {forkJoin} from 'rxjs';


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

  novoClienteFisica: PessoaFisica = {tipo: 'fisica', nome: '',email: '', telefone: '', cpf: '', dataNasc: new Date};
  novoClienteJuridica: PessoaJuridica = {tipo: 'juridica', nome: '',email: '', telefone: '',razaoSocial: '', cnpj: ''};


  listaClientesFisica: PessoaFisica[] = [];
  listaClientesJuridica: PessoaJuridica[] = [];
  listaUnificada: IPessoaListaAdapter[] = [];

  unificarListas() {
    const adaptadasFisica = this.listaClientesFisica.map(
      pf => new PessoaFisicaAdapter(pf)
    );

    const adaptadasJuridica = this.listaClientesJuridica.map(
      pj => new PessoaJuridicaAdapter(pj)
    );

    this.listaUnificada = [
      ...adaptadasFisica,
      ...adaptadasJuridica
    ];
  }

  constructor(private pessoaFisicaService: PessoaFisicaService, private pessoaJuridicaService: PessoaJuridicaService) {
  }

  ngOnInit() {
    forkJoin({
      fisicas: this.pessoaFisicaService.listarClienteFisica(),
      juridicas: this.pessoaJuridicaService.listarClienteJuridica()
    }).subscribe(({ fisicas, juridicas }) => {
      this.listaClientesFisica = fisicas;
      this.listaClientesJuridica = juridicas;
      this.unificarListas();
    });
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
      this.unificarListas();
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
        console.log('Empresa cadastrada com sucesso!');
        alert('Empresa cadastrada com sucesso!');
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
          alert(erro.error?.message || 'Já existe uma Empresa com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar empresa.');
        }
      }
    });
  }

  atualizarListaClientesJuridica(): void {
    this.pessoaJuridicaService.listarClienteJuridica().subscribe(pessoaJuridica => {
      this.listaClientesJuridica = pessoaJuridica;
      this.unificarListas();
    });
  }


  removerCliente(cliente: any) {
    if (cliente.id === undefined) {
      alert("ID do cliente não encontrado. Não é possível remover.");
      return;
    }

    const mensagem = cliente.tipo === 'fisica'
      ? `Tem certeza que deseja remover o cliente "${cliente.nomeResponsavel}"?`
      : `Tem certeza que deseja remover a empresa "${cliente.razaoSocial}"?`;

    if (confirm(mensagem)) {
      if (cliente.tipo === 'fisica') {
        this.pessoaFisicaService.deletarClienteFisicaById(cliente.id).subscribe({
          next: () => {
            this.listaClientesFisica = this.listaClientesFisica.filter(g => g.id !== cliente.id);
            this.unificarListas();
            alert('Cliente removido com sucesso!');
          },
          error: () => {
            alert('Ocorreu um erro ao tentar remover o cliente.');
          }
        });
      } else if (cliente.tipo === 'juridica') {
        this.pessoaJuridicaService.deletarClienteJuridicaById(cliente.id).subscribe({
          next: () => {
            this.listaClientesJuridica = this.listaClientesJuridica.filter(g => g.id !== cliente.id);
            this.unificarListas();
            alert('Empresa removida com sucesso!');
          },
          error: () => {
            alert('Ocorreu um erro ao tentar remover a empresa.');
          }
        });
      } else {
        alert('Tipo de cliente desconhecido!');
      }
    }
  }


}
