import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ordemservicopeca} from '../models/ordemservicopeca';
import {OrdemServicoServico} from '../models/ordemServicoServico';

@Injectable({
  providedIn: 'root'
})
export class OrdemservicopecaService {

  url: string = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  incluirOrdemSerivicoPeca(ordemSerivicoPeca:Ordemservicopeca):Observable<Ordemservicopeca>{
    return this.http.post<Ordemservicopeca>(this.url + "/ordemServicoPeca", ordemSerivicoPeca);
  }

  listarOrdemSerivicoPeca():Observable<Ordemservicopeca[]>{
    return this.http.get<Ordemservicopeca[]>(this.url + '/ordemServicoPeca');
  }

  listarOrdemServicoPecaPorOSID(id: number): Observable<Ordemservicopeca[]> {
    return this.http.get<Ordemservicopeca[]>(`${this.url}/ordemServicoPeca/pecas/${id}`);
  }

  deletarOrdemSerivicoPecaById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/ordemServicoPeca/' + id);
  }

  atualizarOrdemSerivicoPeca(ordemSerivicoPeca: Ordemservicopeca): Observable<Ordemservicopeca>{
    return this.http.put<Ordemservicopeca>(this.url + '/ordemServicoPeca', ordemSerivicoPeca);
  }
}
