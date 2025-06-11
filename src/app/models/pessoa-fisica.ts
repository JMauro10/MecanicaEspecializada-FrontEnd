import {Cliente} from './Cliente';


export interface PessoaFisicaResposta extends Cliente {
  cpf: string;
  dataNascimento?: string; // ISO format (ex: "2025-06-10")
}
