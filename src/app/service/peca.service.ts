import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Peca} from '../models/peca';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirPeca(peca: Peca): Observable<Peca>{
    return this.http.post<Peca>(this.url + '/peca', peca);
  }

  listarPeca():Observable<Peca[]>{
    return this.http.get<Peca[]>(this.url + '/peca');
  }

  deletarPecaById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/peca/' + id);
  }

  atualizarPeca(peca: Peca): Observable<Peca>{
    return this.http.put<Peca>(this.url + '/peca', peca);
  }
}
