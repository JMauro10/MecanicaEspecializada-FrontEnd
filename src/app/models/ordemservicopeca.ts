import {Peca} from './peca';
import {Ordemservico} from './ordemservico';

export interface Ordemservicopeca {
  id?:number;
  peca:Peca;
  ordemServico:Ordemservico;
  quantidade:number;
  valorTotal:number;
}
