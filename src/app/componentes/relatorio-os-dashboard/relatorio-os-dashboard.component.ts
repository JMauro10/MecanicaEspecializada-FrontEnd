import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {Message} from 'primeng/message';
import {InputText} from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {CurrencyPipe, NgIf} from '@angular/common';
import {OrdemServicoRelatorioDTO} from '../../models/ordem-servico-relatorio-dto';
import {RelatorioOsServiceService} from '../../service/relatorio-os-service.service';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Card} from 'primeng/card';
import {UIChart} from 'primeng/chart';
import {TableModule} from 'primeng/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-relatorio-os-dashboard',
  imports: [
    FormsModule,
    Dialog,
    Message,
    InputText,
    ButtonDirective,
    NgIf,
    ProgressSpinner,
    Card,
    CurrencyPipe,
    UIChart,
    TableModule
  ],
  templateUrl: './relatorio-os-dashboard.component.html',
  styleUrl: './relatorio-os-dashboard.component.css'
})
export class RelatorioOsDashboardComponent implements OnInit{
  showLogin = true;
  username = '';
  password = '';
  loginError = false;

  dados: OrdemServicoRelatorioDTO | null = null;
  carregando = false;
  rankingServicosChartData: any;

  constructor(private relatorioService: RelatorioOsServiceService) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.showLogin = false;
      this.loginError = false;
      this.carregarDashboard();
    } else {
      this.loginError = true;
    }
  }

  carregarDashboard() {
    this.carregando = true;
    this.relatorioService.obterDashboardRelatorio().subscribe({
      next: (resp) => {
        this.dados = resp;
        this.inicializarGraficos();
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        // Coloque aqui uma lógica para tratar erros
      }
    });
  }

  inicializarGraficos() {
    if (!this.dados) return;
    this.rankingServicosChartData = {
      labels: this.dados.rankingServicos?.map(s => s.descricaoServico),
      datasets: [
        {
          data: this.dados.rankingServicos?.map(s => s.quantidadeExecucoes),
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8', '#dc3545', '#6610f2'],
          hoverBackgroundColor: ['#0056b3', '#218838', '#e0a800', '#138496', '#c82333', '#520dc2']
        }
      ]
    };
  }

  logout() {
    this.showLogin = true;
    this.username = '';
    this.password = '';
    this.dados = null;
    this.rankingServicosChartData = null;
  }

  exportarPDF() {
    const relatorio = document.getElementById('relatorio-pdf');
    if (!relatorio) return;

    html2canvas(relatorio, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Ajusta a imagem ao tamanho da página
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;

      // Para páginas múltiplas, se necessário
      if (pdfHeight < pageHeight) {
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      } else {
        let heightLeft = pdfHeight;
        while (heightLeft > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pageHeight;
          if (heightLeft > 0) {
            pdf.addPage();
            position = 0;
          }
        }
      }
      pdf.save('relatorio.pdf');
    });
  }
}
