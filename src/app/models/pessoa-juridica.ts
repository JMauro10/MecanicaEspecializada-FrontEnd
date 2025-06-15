import { Cliente } from './cliente';

export interface PessoaJuridicaResposta extends Cliente {
  cnpj: string;
  razaoSocial: string;
}
