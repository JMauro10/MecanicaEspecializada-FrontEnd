import {Servico} from './servico';
import {Ordemservico} from './ordemservico';

export interface OrdemServicoServico {
  id?:number; //
  servico:Servico;
  ordemServico:Ordemservico;
  quantidade:number;
  valorTotal:number;
}
