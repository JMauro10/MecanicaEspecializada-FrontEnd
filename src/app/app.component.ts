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
      label: 'Clientes',
      routerLink: '/cliente-list'
    },
    {
      label: 'Veículos',
      routerLink: '/veiculo-list'
    },
    {
      label: 'Funcionários',
      routerLink: '/funcionario-list'
    },
    {
      label: 'Peças',
      routerLink: '/peca-list'
    },
    {
      label: 'Serviços',
      routerLink: '/servico-list'
    }
  ];
}
