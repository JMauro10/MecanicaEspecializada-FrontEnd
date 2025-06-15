import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrdemServicoRelatorioDTO} from '../models/ordem-servico-relatorio-dto';

@Injectable({
  providedIn: 'root'
})
export class RelatorioOsServiceService {
  private apiUrl = 'http://localhost:8080/api/os-relatorio/dashboard';

  constructor(private http: HttpClient) { }

  obterDashboardRelatorio(): Observable<OrdemServicoRelatorioDTO> {
    console.log(`Fazendo requisição para: ${this.apiUrl}`);
    return this.http.get<OrdemServicoRelatorioDTO>(this.apiUrl);
  }
}
