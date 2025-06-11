import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Modelo} from '../models/modelo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirModelo(modelo: Modelo): Observable<Modelo>{
    return this.http.post<Modelo>(this.url + '/modelo', modelo);
  }

  listarModelo():Observable<Modelo[]>{
    return this.http.get<Modelo[]>(this.url + '/modelo');
  }

  deletarModeloById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/modelo/' + id);
  }

  atualizarModelo(modelo: Modelo): Observable<Modelo>{
    return this.http.put<Modelo>(this.url + '/modelo', modelo);
  }
}
