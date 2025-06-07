import { IPessoaListaAdapter } from './ipessoa-lista-adapter';
import {PessoaJuridica} from '../models/pessoaJuridica';

export class PessoaJuridicaAdapter implements IPessoaListaAdapter {
  id?: number;
  nomeResponsavel: string;
  razaoSocial?: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  tipo: string;

  constructor(pj: PessoaJuridica) {
    this.id = pj.id;
    this.nomeResponsavel = pj.nome;
    this.razaoSocial = pj.razaoSocial;
    this.email = pj.email;
    this.telefone = pj.telefone;
    this.cpfCnpj = pj.cnpj;
    this.tipo = pj.tipo;
  }
}
