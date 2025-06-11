import { Cliente } from './Cliente';

export interface PessoaJuridicaResposta extends Cliente {
  cnpj: string;
  razaoSocial: string;
}
