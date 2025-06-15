import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MecanicaEspecializada-FrontEnd';


  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/ordemServico-list'
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      routerLink: '/cliente-list'
    },
    {
      label: 'Veículos',
      icon: 'pi pi-car',
      routerLink: '/veiculo-list'
    },
    {
      label: 'Funcionários',
      icon: 'pi pi-id-card',
      routerLink: '/funcionario-list'
    },
    {
      label: 'Peças',
      icon: 'pi pi-wrench',
      routerLink: '/peca-list'
    },
    {
      label: 'Serviços',
      icon: 'pi pi-briefcase',
      routerLink: '/servico-list'
    },
    {
      label: 'Marca',
      icon: 'pi pi-tag',
      routerLink: '/marca-list'
    },
    {
      label: 'Modelo',
      icon: 'pi pi-bookmark',
      routerLink: '/modelo-list'
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-chart-bar',
      routerLink: '/relatorio-os-dashboard'
    }
  ];
}
