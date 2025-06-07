
import { IPessoaListaAdapter } from './ipessoa-lista-adapter';
import {PessoaFisica} from '../models/pessoaFisica';

export class PessoaFisicaAdapter implements IPessoaListaAdapter {
  id?: number;
  nomeResponsavel: string;
  razaoSocial?: string = '';
  email: string;
  telefone: string;
  cpfCnpj: string;
  tipo: string;

  constructor(pf: PessoaFisica) {
    this.id = pf.id;
    this.nomeResponsavel = pf.nome;
    this.email = pf.email;
    this.telefone = pf.telefone;
    this.cpfCnpj = pf.cpf;
    this.tipo = pf.tipo;
  }
}
