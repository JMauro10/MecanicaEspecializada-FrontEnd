import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ordemservico} from '../models/ordemservico';

@Injectable({
  providedIn: 'root'
})
export class OrdemservicoService {

  url: string = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  incluirOrdemSerivico(ordemSerivico:Ordemservico):Observable<Ordemservico>{
    return this.http.post<Ordemservico>(this.url + "/ordemServico", ordemSerivico);
  }

  listarOrdemSerivico():Observable<Ordemservico[]>{
    return this.http.get<Ordemservico[]>(this.url + '/ordemServico');
  }

  deletarOrdemSerivicoById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/ordemServico/' + id);
  }

  atualizarOrdemSerivico(ordemSerivico: Ordemservico): Observable<Ordemservico>{
    return this.http.put<Ordemservico>(this.url + '/ordemServico', ordemSerivico);
  }

  pagarOrdemServico(id: number):Observable<Ordemservico>{
    return this.http.put<Ordemservico>(`${this.url}/ordemServico/${id}/pagar`, null);
  }

  cancelarOrdemServico(id:number):Observable<Ordemservico>{
    return this.http.put<Ordemservico>(`${this.url}/ordemServico/${id}/cancelar`, null);
  }
}
