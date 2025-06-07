import { Injectable } from '@angular/core';
import {PessoaFisicaService} from './pessoaFisica.service';
import {PessoaJuridicaService} from './pessoaJuridica.service';
import {forkJoin, map, Observable} from 'rxjs';
import {IPessoaListaAdapter} from '../adapter/ipessoa-lista-adapter';
import {PessoaFisicaAdapter} from '../adapter/PessoaFisicaAdapter';
import {PessoaJuridicaAdapter} from '../adapter/PessoaJuridicaAdapter';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(
    private pessoaFisicaService: PessoaFisicaService,
    private pessoaJuridicaService: PessoaJuridicaService
  ) {}

  getListaUnificada(): Observable<IPessoaListaAdapter[]> {
    return forkJoin({
      fisicas: this.pessoaFisicaService.listarClienteFisica(),
      juridicas: this.pessoaJuridicaService.listarClienteJuridica()
    }).pipe(
      map(({ fisicas, juridicas }) => {
        const adaptadasFisica = fisicas.map(pf => new PessoaFisicaAdapter(pf));
        const adaptadasJuridica = juridicas.map(pj => new PessoaJuridicaAdapter(pj));
        return [...adaptadasFisica, ...adaptadasJuridica];
      })
    );
  }
}
