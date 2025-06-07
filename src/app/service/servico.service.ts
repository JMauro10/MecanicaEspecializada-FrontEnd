import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Servico} from '../models/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirServico(servico: Servico): Observable<Servico>{
    return this.http.post<Servico>(this.url + '/servico', servico);
  }

  listarServico():Observable<Servico[]>{
    return this.http.get<Servico[]>(this.url + '/servico');
  }

  deletarServicoById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/servico/' + id);
  }

  atualizarServico(servico: Servico): Observable<Servico>{
    return this.http.put<Servico>(this.url + '/servico', servico);
  }
}
