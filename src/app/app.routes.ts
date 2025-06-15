import { Routes } from '@angular/router';
import {ClienteListComponent} from './componentes/cliente-list/cliente-list.component';
import {VeiculoListComponent} from './componentes/veiculo-list/veiculo-list.component';
import {FuncionarioListComponent} from './componentes/funcionario-list/funcionario-list.component';
import {PecaListComponent} from './componentes/peca-list/peca-list.component';
import {ServicoListComponent} from './componentes/servico-list/servico-list.component';
import {OrdemServicoListComponent} from './componentes/ordem-servico-list/ordem-servico-list.component';
import {OrdemServicoFormularioComponent} from './componentes/ordem-servico-formulario/ordem-servico-formulario.component';
import {OrdemservicoDetalhesComponent} from './componentes/ordemservico-detalhes/ordemservico-detalhes.component';
import {MarcaListComponent} from './componentes/marca-list/marca-list.component';
import {ModeloListComponent} from './componentes/modelo-list/modelo-list.component';
import {RelatorioOsDashboardComponent} from './componentes/relatorio-os-dashboard/relatorio-os-dashboard.component';

export const routes: Routes = [
  { path: 'cliente-list', component: ClienteListComponent },
  { path: 'marca-list', component: MarcaListComponent },
  { path: 'modelo-list', component: ModeloListComponent },
  { path: 'veiculo-list', component: VeiculoListComponent },
  { path: 'funcionario-list', component: FuncionarioListComponent },
  { path: 'peca-list', component: PecaListComponent },
  { path: 'servico-list', component: ServicoListComponent },
  { path: 'ordemServico-list', component: OrdemServicoListComponent },
  { path: 'ordemServico-formulario', component: OrdemServicoFormularioComponent },
  { path: 'ordemServico-detalhes/:id', component: OrdemservicoDetalhesComponent },
  { path: 'relatorio-os-dashboard', component: RelatorioOsDashboardComponent },
  { path: '', redirectTo: '/ordemServico-list', pathMatch: 'full' }
];

