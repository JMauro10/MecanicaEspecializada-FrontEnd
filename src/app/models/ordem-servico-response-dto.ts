
export interface OrdemServicoResponseDTO {
  id?: number;
  nome: string;
  descricaoVeiculo: string;
  dataAbertura: string;
  dataFechamento?: string;
  status?:string;
  observacoes?: string;
  valorTotal?: number;
}
