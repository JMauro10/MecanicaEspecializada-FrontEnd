import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Veiculo} from '../models/veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirVeiculo(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.post<Veiculo>(this.url + '/veiculo', veiculo);
  }

  listarVeiculo():Observable<Veiculo[]>{
    return this.http.get<Veiculo[]>(this.url + '/veiculo');
  }

  deletarVeiculoById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/veiculo/' + id);
  }

  atualizarVeiculo(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.put<Veiculo>(this.url + '/veiculo', veiculo);
  }
}
