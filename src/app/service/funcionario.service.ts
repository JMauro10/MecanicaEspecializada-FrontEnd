import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Funcionario} from '../models/funcionario';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  url: string = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  incluirFuncionario(funcionario:Funcionario):Observable<Funcionario>{
    return this.http.post<Funcionario>(this.url + "/funcionario", funcionario);
  }

  listarFuncionario():Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.url + '/funcionario');
  }

  deletarFuncionarioById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/funcionario/' + id);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.put<Funcionario>(this.url + '/funcionario', funcionario);
  }
}
