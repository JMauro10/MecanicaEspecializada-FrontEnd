import {Data} from '@angular/router';

export interface OrdemServico {
  id?: number;
  cliente: ClienteDTO;
  veiculo: VeiculoDTO;
  dataAbertura: Data;
  dataFechamento?: Data;
  status?: StatusOrdemServico;
  observacoes?: string;
  valorTotal?: number;
}

export interface ClienteDTO {
  id: number;
  tipo: 'fisica' | 'juridica';
}

export interface VeiculoDTO {
  id: number;
}

export type StatusOrdemServico = 'EM_ABERTO' | 'EM_ANDAMENTO' | 'PAGA' | 'CANCELADA';
