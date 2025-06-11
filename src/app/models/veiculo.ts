import {Modelo} from './modelo';

export interface Veiculo {
  id?:number;
  modelo: Modelo;
  ano:number;
  placa:string;
  quilomentragem:number;
  idCliente: number;
}
