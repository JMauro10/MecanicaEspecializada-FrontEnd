import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {ClienteService} from '../../service/cliente.service';
import {PessoaFisicaResposta} from '../../models/pessoa-fisica';
import {PessoaJuridicaResposta} from '../../models/pessoa-juridica';
import {InputMaskModule} from 'primeng/inputmask';


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
    TableModule,
    InputMaskModule
  ],
  templateUrl: './cliente-list.component.html',
  standalone: true,
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent {

  // FILTROS
  termoBusca: string = '';
  tipoSelecionado: string = ''; // Exemplo: '', 'FISICA', 'JURIDICA' etc.
  tiposPessoa = [
    {label: 'Todos', value: ''},
    {label: 'Pessoa Física', value: 'fisica'},
    {label: 'Pessoa Jurídica', value: 'juridica'},
  ];
  clientes = [
    {label: 'Pessoa Física', value: 'fisica'},
    {label: 'Pessoa Jurídica', value: 'juridica'}
  ];


  //ATRIBUTOS
  selecionarCliente: string | null = null;
  novoClienteFisica: PessoaFisica = {tipo: 'fisica', nome: '', email: '', telefone: '', cpf: '', dataNasc: new Date};
  novoClienteJuridica: PessoaJuridica = {
    tipo: 'juridica',
    nome: '',
    email: '',
    telefone: '',
    razaoSocial: '',
    cnpj: ''
  };
  listarClientes: (PessoaFisicaResposta | PessoaJuridicaResposta)[] = [];
  listaClientesFisica: PessoaFisica[] = [];
  listaClientesJuridica: PessoaJuridica[] = [];
  listaUnificada: IPessoaListaAdapter[] = [];
  exibeModalEdicaoFisica: boolean = false;
  exibeModalEdicaoJuridica: boolean = false;
  form!: FormGroup;
  formJuridica!: FormGroup;
  mostrarDialogoPessoaFisica = false;
  mostrarDialogoPessoaJuridica = false;


  //CONSTRUTOR
  constructor(private clienteService: ClienteService, private pessoaFisicaService: PessoaFisicaService, private pessoaJuridicaService: PessoaJuridicaService, private fb: FormBuilder) {
  }


  //METODO DE PREENCHIMENTO DE LISTA E DE FORMULÁRIOS AUTOMATICO
  ngOnInit() {
    console.log('Primeiro cliente:', this.listaUnificada[0]);
    console.log("Todos os tipos encontrados:", [...new Set(this.listaUnificada.map(c => c.tipo))]);
    forkJoin({
      fisicas: this.pessoaFisicaService.listarClienteFisica(),
      juridicas: this.pessoaJuridicaService.listarClienteJuridica()
    }).subscribe(({fisicas, juridicas}) => {
      this.listaClientesFisica = fisicas;
      this.listaClientesJuridica = juridicas;
      this.unificarListas();
    });

    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.listarClientes = data;
      },
      error: (err) => {
        console.error('Erro ao buscar clientes', err);
      }
    });

    this.form = this.fb.group({
      id: [null],
      tipo: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: [''],
      cpf: ['', Validators.required],
      dataNasc: [null]
    });

    this.formJuridica = this.fb.group({
      id: [null],
      tipo: ['juridica'],
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
      nomeResponsavel: [''],
      email: [''],
      telefone: ['']
    });
  }


  //METODO PARA UNIFICAÇÃO DAS LISTAS PESSOA FISICA E JURIDICA
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


  //METODO DE ABRIR POPUP PARA EDIÇÃO AMBOS TIPOS DE PESSOA
  onClienteChange(clienteSelecionado: string) {
    if (clienteSelecionado === 'fisica') {
      // Zera objeto de pessoa física antes de abrir o modal!
      this.novoClienteFisica = {
        nome: '',
        tipo: 'fisica',
        email: '',
        telefone: '',
        cpf: '',
        dataNasc: new Date()
      };
      this.mostrarDialogoPessoaFisica = true;
    } else if (clienteSelecionado === 'juridica') {
      // Zera objeto de pessoa jurídica antes de abrir o modal!
      this.novoClienteJuridica = {
        nome: '',
        tipo: '',
        email: '',
        telefone: '',
        cnpj: '',
        razaoSocial: ''
      };
      this.mostrarDialogoPessoaJuridica = true;
    }
  }


  //METODO PARA ADICIONAR PESSOA FISICA
  adicionarClienteFisica() {
    if (!this.novoClienteFisica.nome.trim()) {
      alert('O nome é obrigatório!');
      return;
    }
    if (!this.novoClienteFisica.telefone.trim()) {
      alert('O telefone é obrigatório!');
      return;
    }
    if (!this.novoClienteFisica.cpf.trim()) {
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
        this.ngOnInit();
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um cliente com esse nome!');
        } else if (erro.status === 500) {
          alert('Já existe um cliente com esse CPF!');
        }
      }
    });
  }


  //METODO PARA ATUALIZAR A LISTA DE CLIENTE FISICA
  atualizarListaClientesFisica(): void {
    this.pessoaFisicaService.listarClienteFisica().subscribe(pessoaFisica => {
      console.log('Retorno do backend:', pessoaFisica);
      this.listaClientesFisica = pessoaFisica;
      this.unificarListas();
    });
  }


  //METODO PARA ADICIONAR PESSOA JURIDICA
  adicionarClienteJuridica() {
    if (!this.novoClienteJuridica.nome.trim()) {
      alert('O nome do responsável é obrigatório!');
      return;
    }
    if (!this.novoClienteJuridica.telefone.trim()) {
      alert('O telefone é obrigatório!');
      return;
    }
    if (!this.novoClienteJuridica.razaoSocial.trim()) {
      alert('A razão Social é obrigatória!');
      return;
    }
    if (!this.novoClienteJuridica.cnpj.trim()) {
      alert('O CNPJ é obrigatório!');
      return;
    }

    // Setando explicitamente o tipo
    this.novoClienteJuridica.tipo = 'juridica';

    // Verificação do CNPJ (chamando o backend antes de salvar)
    this.pessoaJuridicaService.verificarCnpj(this.novoClienteJuridica.cnpj).subscribe({
      next: (resposta) => {
        console.log('Resposta do endpoint:', resposta);
        if (resposta.existe) {
          alert('Já existe uma empresa cadastrada com esse CNPJ!');
          return;
        }

        // Se não existe, pode incluir normalmente
        this.pessoaJuridicaService.incluirClienteJuridica(this.novoClienteJuridica).subscribe({
          next: (pessoaJuridica) => {
            console.log('Empresa cadastrada com sucesso!');
            alert('Empresa cadastrada com sucesso!');
            this.atualizarListaClientesJuridica();
            this.novoClienteJuridica = {
              nome: '',
              tipo: 'juridica',
              email: '',
              telefone: '',
              razaoSocial: '',
              cnpj: ''
            };
            this.mostrarDialogoPessoaJuridica = false;
            this.ngOnInit();
          },
          error: (erro) => {
            if (erro.status === 400 || erro.status === 409) {
              alert(erro.error?.message || 'Já existe uma Empresa com esse nome!');
            } else {
              alert('Erro inesperado ao cadastrar empresa.');
            }
          }
        });
      },
      error: (erro) => {
        console.error('Erro ao verificar existência do CNPJ:', erro);
        alert('Erro ao verificar existência do CNPJ.');
      }
    });
  }


  //METODO PARA ATUALIZAR A LISTA DE CLIENTE JURIDICA
  atualizarListaClientesJuridica(): void {
    this.pessoaJuridicaService.listarClienteJuridica().subscribe(pessoaJuridica => {
      console.log('Retorno do backend:', pessoaJuridica);
      this.listaClientesJuridica = pessoaJuridica;
      this.unificarListas();
    });
  }


  //METODO PARA REMOVER AMBOS TIPOS DE CLIENTE
  removerCliente(cliente: any) {
    if (cliente.id === undefined) {
      alert("ID do cliente não encontrado. Não é possível remover.");
      return;
    }

    const mensagem = cliente.tipo === 'fisica'
      ? `Tem certeza que deseja remover o cliente "${cliente.nome}"?`
      : `Tem certeza que deseja remover a empresa "${cliente.razaoSocial}"?`;

    if (confirm(mensagem)) {
      if (cliente.tipo === 'fisica') {
        this.pessoaFisicaService.deletarClienteFisicaById(cliente.id).subscribe({
          next: () => {
            this.listaClientesFisica = this.listaClientesFisica.filter(g => g.id !== cliente.id);
            this.unificarListas();
            alert('Cliente removido com sucesso!');
            this.ngOnInit();
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
            this.ngOnInit();
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


  //METODO PARA MOSTRAR OS DADOS NA EDIÇÃO DE PESSOA FISICA
  editarClienteFisica(pessoaFisica: PessoaFisica) {
    console.log('Pessoa recebida para edição:', pessoaFisica);
    this.exibeModalEdicaoFisica = true;

    setTimeout(() => {
      const pessoaAdaptada = new PessoaFisicaAdapter(pessoaFisica);
      console.log('Pessoa adaptada:', pessoaAdaptada);
      if (this.form) {
        this.form.get('id')?.setValue(pessoaAdaptada.id);
        this.form.get('tipo')?.setValue(pessoaAdaptada.tipo || '');
        this.form.get('nome')?.setValue(pessoaAdaptada.nomeResponsavel || '');
        this.form.get('email')?.setValue(pessoaAdaptada.email || '');
        this.form.get('telefone')?.setValue(pessoaAdaptada.telefone || '');
        this.form.get('cpf')?.setValue(pessoaAdaptada.cpfCnpj || '');

      }
    });
  }


  //METODO PARA MOSTRAR OS DADOS NA EDIÇÃO DE PESSOA JURIDICA
  editarClienteJuridica(pessoaJuridica: PessoaJuridica) {
    this.exibeModalEdicaoJuridica = true;
    setTimeout(() => {
      const pessoaAdaptada = new PessoaJuridicaAdapter(pessoaJuridica);
      if (this.formJuridica) {

        this.formJuridica.patchValue({
          id: pessoaAdaptada.id,
          tipo: pessoaAdaptada.tipo || '',
          nomeResponsavel: pessoaAdaptada.nomeResponsavel || '',
          razaoSocial: pessoaAdaptada.razaoSocial || '',
          email: pessoaAdaptada.email || '',
          telefone: pessoaAdaptada.telefone || '',
          cnpj: pessoaAdaptada.cpfCnpj || ''
        });
      }
    });
  }


  //METODO PARA ABRIR O POPUP PARA EDIÇÃO DE PESSOA FISICA OU JURIDICA
  abrirEdicao(id: number, tipo: string) {
    if (tipo === 'fisica') {
      // Busca o objeto original na lista de Pessoas Físicas
      const clienteOriginal = this.listaClientesFisica.find(p => p.id === id);
      if (clienteOriginal) {
        this.editarClienteFisica(clienteOriginal);
      }
    } else if (tipo === 'juridica') {
      const clienteOriginal = this.listaClientesJuridica.find(p => p.id === id);
      if (clienteOriginal) {
        this.editarClienteJuridica(clienteOriginal);
      }
    }
  }


  //METODO PARA SALVAR A EDIÇÃO DE PESSOA FISICA
  salvarEdicaoFisica() {
    if (this.form.invalid) {
      return;
    }
    const clienteEditado: PessoaFisica = this.form.value;
    this.pessoaFisicaService.atualizarClienteFisica(clienteEditado).subscribe({
      next: (clienteAtualizado) => {
        // Atualiza somente o item na lista local
        const idx = this.listaUnificada.findIndex(g => g.id === clienteAtualizado.id);
        if (idx !== -1) {
          this.listaUnificada[idx] = new PessoaFisicaAdapter(clienteAtualizado);
          this.listaUnificada = [...this.listaUnificada];
        }
        this.exibeModalEdicaoFisica = false;
        alert('Cliente atualizado com sucesso!');
        this.ngOnInit();
      },
      error: (erro) => {
        if (erro.status === 409) {
          alert(erro.error?.message || 'Já existe um cliente com esse nome!');
        } else if (erro.status === 500) {
          alert('O tamanho não é suportado!');
        } else {
          alert(erro)
        }
      }
    });
  }


  //METODO PARA SALVAR A EDIÇÃO DE PESSOA JURIDICA
  salvarEdicaoJuridica() {
    if (this.formJuridica.invalid) {
      return;
    }

    this.formJuridica.get('tipo')?.setValue('juridica');


    const clienteEditado: PessoaJuridica = {
      ...this.formJuridica.value,
      nome: this.formJuridica.value.nomeResponsavel
    };
    console.log('JSON que será enviado:', clienteEditado);
    console.log('Enviando para atualizar:', clienteEditado);
    this.pessoaJuridicaService.atualizarClienteJuridica(clienteEditado).subscribe({
      next: (clienteAtualizado) => {
        console.log('Retorno do backend:', clienteAtualizado);
        // Atualiza somente o item na lista local
        const idx = this.listaUnificada.findIndex(g => g.id === clienteAtualizado.id);
        if (idx !== -1) {
          this.listaUnificada[idx] = new PessoaJuridicaAdapter(clienteAtualizado);
          this.listaUnificada = [...this.listaUnificada];
          this.ngOnInit();
        }
        this.exibeModalEdicaoJuridica = false;
        alert('Cliente atualizado com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao atualizar:', erro);
        if (erro.status === 409) {
          alert(erro.error?.message || 'Já existe um cliente com esse nome!');
        } else if (erro.status === 500) {
          alert('O tamanho não é suportado!');
        } else {
          alert(erro)
        }
      }
    });
  }


  //METODO DE PARA FILTRAGEM
  get clientesFiltrados(): (PessoaFisicaResposta | PessoaJuridicaResposta)[] {
    return this.listarClientes
      .filter(cliente => {
        // Filtro pelo tipo selecionado
        if (!this.tipoSelecionado) return true;
        if (this.tipoSelecionado === 'fisica') {
          return 'cpf' in cliente;
        }
        if (this.tipoSelecionado === 'juridica') {
          return 'cnpj' in cliente && 'razaoSocial' in cliente;
        }
        // Caso por algum motivo venha outro tipo
        return true;
      })
      .filter(cliente => {
        // Filtro pelo termo de busca
        const termo = this.termoBusca?.toLowerCase() ?? '';
        let valores: string[] = [
          cliente.nome?.toLowerCase() ?? '',
          cliente.email?.toLowerCase() ?? '',
          cliente.telefone?.toLowerCase() ?? ''
        ];
        if ('razaoSocial' in cliente && 'cnpj' in cliente) {
          valores.push(
            (cliente as PessoaJuridicaResposta).razaoSocial?.toLowerCase() ?? '',
            (cliente as PessoaJuridicaResposta).cnpj?.toLowerCase() ?? ''
          );
        }
        if ('cpf' in cliente) {
          valores.push(
            (cliente as PessoaFisicaResposta).cpf?.toLowerCase() ?? ''
          );
        }
        return !this.termoBusca || valores.some(valor => valor.includes(termo));
      });
  }


}
