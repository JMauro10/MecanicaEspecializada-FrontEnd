import {Marca} from './marca';
import {Modelo} from './modelo';
import {Cliente} from './cliente';

export interface Veiculo {
  id?:number;
  marca:Marca;
  modelo:Modelo;
  ano:number;
  placa:string;
  quilometragem:number;
  clienteId: number;
}
