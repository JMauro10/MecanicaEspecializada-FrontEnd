import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PessoaJuridica} from '../models/pessoaJuridica';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirClienteJuridica(pessoaJuridica: PessoaJuridica): Observable<PessoaJuridica>{
    return this.http.post<PessoaJuridica>(this.url + '/clienteJuridica', pessoaJuridica);
  }

  listarClienteJuridica():Observable<PessoaJuridica[]>{
    return this.http.get<PessoaJuridica[]>(this.url + '/clienteJuridica');
  }

  deletarClienteJuridicaById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/clienteJuridica/' + id);
  }

  atualizarClienteJuridica(pessoaJuridica: PessoaJuridica): Observable<PessoaJuridica>{
    return this.http.put<PessoaJuridica>(this.url + '/clienteJuridica', pessoaJuridica);
  }


  verificarCnpj(cnpj: string) {
    return this.http.get<{ existe: boolean }>(`/clienteJuridica/existe-cnpj/${encodeURIComponent(cnpj)}`);
  }


}
