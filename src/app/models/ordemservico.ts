import {PessoaFisica} from './pessoaFisica';
import {PessoaJuridica} from './pessoaJuridica';
import {Veiculo} from './veiculo';
import {Data} from '@angular/router';

export interface Ordemservico {
  id?:number;
  clienteF:PessoaFisica;
  clienteJ:PessoaJuridica;
  veiculo:Veiculo;
  dataAbertura:Data;
  dataFechamento:Data;
  status:string;
  observacao:string;
  valorTotal:number;
}
