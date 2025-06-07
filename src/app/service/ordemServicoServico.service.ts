import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrdemServicoServico} from '../models/ordemServicoServico';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoServicoService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirOrdemServicoServico(ordemServicoServico: OrdemServicoServico): Observable<OrdemServicoServico>{
    return this.http.post<OrdemServicoServico>(this.url + '/ordemServicoServico', ordemServicoServico);
  }

  listarOrdemServicoServico():Observable<OrdemServicoServico[]>{
    return this.http.get<OrdemServicoServico[]>(this.url + '/ordemServicoServico');
  }

  deletarOrdemServicoServicoById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/ordemServicoServico/' + id);
  }

  atualizarOrdemServicoServico(ordemServicoServico: OrdemServicoServico): Observable<OrdemServicoServico>{
    return this.http.put<OrdemServicoServico>(this.url + '/ordemServicoServico', ordemServicoServico);
  }

}
