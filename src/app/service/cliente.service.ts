import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PessoaFisicaResposta} from '../models/pessoa-fisica';
import {PessoaJuridicaResposta} from '../models/pessoa-juridica';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/cliente';

  constructor(private http:HttpClient) { }

  listarClientes(): Observable<(PessoaFisicaResposta | PessoaJuridicaResposta)[]> {
    return this.http.get<(PessoaFisicaResposta | PessoaJuridicaResposta)[]>(this.apiUrl);
  }
}
