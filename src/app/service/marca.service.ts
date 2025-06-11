import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Marca} from '../models/marca';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirMarca(marca: Marca): Observable<Marca>{
    return this.http.post<Marca>(this.url + '/marca', marca);
  }

  listarMarca():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.url + '/marca');
  }

  deletarMarcaById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/marca/' + id);
  }

  atualizarMarca(marca: Marca): Observable<Marca>{
    return this.http.put<Marca>(this.url + '/marca', marca);
  }
}
