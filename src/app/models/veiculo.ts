import {Marca} from './marca';
import {Modelo} from './modelo';

export interface Veiculo {
  id?:number;
  marca:Marca;
  modelo:Modelo;
  ano:number;
  placa:string;
  quilomentragem:number;
  idCliente: number;
}
