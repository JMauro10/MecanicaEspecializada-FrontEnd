import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PessoaFisica} from '../models/pessoaFisica';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirClienteFisica(pessoaFisica: PessoaFisica): Observable<PessoaFisica>{
    return this.http.post<PessoaFisica>(this.url + '/clienteFisica', pessoaFisica);
  }

  listarClienteFisica():Observable<PessoaFisica[]>{
    return this.http.get<PessoaFisica[]>(this.url + '/clienteFisica');
  }

  deletarClienteFisicaById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/clienteFisica/' + id);
  }

  atualizarClienteFisica(pessoaFisica: PessoaFisica): Observable<PessoaFisica>{
    return this.http.put<PessoaFisica>(this.url + '/clienteFisica', pessoaFisica);
  }
}
