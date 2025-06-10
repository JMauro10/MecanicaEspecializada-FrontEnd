import {Data} from '@angular/router';

export interface OrdemServico {
  id?: number;
  cliente: ClienteDTO;
  veiculo: VeiculoDTO;
  dataAbertura: string;
  dataFechamento?: string;
  status?:string;
  observacoes?: string;
  valorTotal?: number;
}

export interface ClienteDTO {
  id: number;
  tipo: string;
}

export interface VeiculoDTO {
  id: number;
}

