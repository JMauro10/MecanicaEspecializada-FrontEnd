import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrdemServico} from '../models/ordemservico';
import {Ordemservicoresponsedto} from '../models/ordemservicoresponsedto';

@Injectable({
  providedIn: 'root'
})
export class OrdemservicoService {

  url: string = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  incluirOrdemSerivico(ordemSerivico:OrdemServico):Observable<OrdemServico>{
    return this.http.post<OrdemServico>(this.url + "/ordemServico", ordemSerivico);
  }

  listarOrdemSerivico():Observable<OrdemServico[]>{
    return this.http.get<OrdemServico[]>(this.url + '/ordemServico');
  }

  buscarPorId(id:number):Observable<Ordemservicoresponsedto>{
    return this.http.get<Ordemservicoresponsedto>(`${this.url}/ordemServico/${id}`);
  }

  atualizarOrdemSerivico(ordemSerivico: OrdemServico): Observable<OrdemServico>{
    return this.http.put<OrdemServico>(this.url + '/ordemServico', ordemSerivico);
  }

  pagarOrdemServico(id: number):Observable<OrdemServico>{
    return this.http.put<OrdemServico>(`${this.url}/ordemServico/${id}/pagar`, null);
  }

  cancelarOrdemServico(id:number):Observable<OrdemServico>{
    return this.http.put<OrdemServico>(`${this.url}/ordemServico/${id}/cancelar`, null);
  }

  reabrirOrdemServico(id:number):Observable<OrdemServico>{
    return this.http.put<OrdemServico>(`${this.url}/ordemServico/${id}/reabrir`, null);
  }
}
