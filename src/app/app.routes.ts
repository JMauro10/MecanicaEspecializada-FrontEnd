import { Routes } from '@angular/router';
import {ClienteListComponent} from './componentes/cliente-list/cliente-list.component';
import {VeiculoListComponent} from './componentes/veiculo-list/veiculo-list.component';
import {FuncionarioListComponent} from './componentes/funcionario-list/funcionario-list.component';
import {PecaListComponent} from './componentes/peca-list/peca-list.component';
import {ServicoListComponent} from './componentes/servico-list/servico-list.component';

export const routes: Routes = [
  {path: 'cliente-list', component: ClienteListComponent},
  {path: 'veiculo-list', component: VeiculoListComponent},
  {path: 'funcionario-list', component: FuncionarioListComponent},
  {path: 'peca-list', component:PecaListComponent},
  {path: 'servico-list',component: ServicoListComponent},
  {path: '', redirectTo: '/cliente-list', pathMatch: 'full'}
];
