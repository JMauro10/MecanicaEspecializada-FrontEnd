import {Cliente} from './cliente';


export interface PessoaFisicaResposta extends Cliente {
  cpf: string;
  dataNascimento?: string; // ISO format (ex: "2025-06-10")
}
