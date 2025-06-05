import { Routes } from '@angular/router';
import {ClienteListComponent} from './componentes/cliente-list/cliente-list.component';
import {VeiculoListComponent} from './componentes/veiculo-list/veiculo-list.component';
import {FuncionarioListComponent} from './componentes/funcionario-list/funcionario-list.component';

export const routes: Routes = [
  {path: 'cliente-list', component: ClienteListComponent},
  {path: 'veiculo-list', component: VeiculoListComponent},
  {path: 'funcionario-list', component: FuncionarioListComponent},
  {path: '', redirectTo: '/cliente-list', pathMatch: 'full'}
];
