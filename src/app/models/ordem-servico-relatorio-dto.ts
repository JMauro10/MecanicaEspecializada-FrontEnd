import {RelatorioRankingServicoDTO} from './relatorio-ranking-servico-dto';
import {RelatorioServicosPorMecanicoDTO} from './relatorio-servicos-por-mecanico-dto';

export interface OrdemServicoRelatorioDTO {
  quantidadeTotalOs: number;
  valorTotalFaturamento: number;
  valorTotalPecas: number;
  valorTotalServicos: number;
  servicoMaisSolicitado: string;
  rankingServicos: RelatorioRankingServicoDTO[];
  servicosPorMecanico?: RelatorioServicosPorMecanicoDTO[];
}
