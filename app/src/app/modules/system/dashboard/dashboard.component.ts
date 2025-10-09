import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  chart!: any;
  chart2!: any;
  chart3!: any;
  @ViewChild('charthtml') someInput!: ElementRef;
  @ViewChild('charthtml2') someInput2!: ElementRef;
  @ViewChild('charthtml3') someInput3!: ElementRef;

  ngOnInit(): void {
    this.chart = {
      type: 'bar',
      data: {
        labels: ['Pacientes'],
        datasets: [
          {
            label: 'Julho',
            data: [60],
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Agosto',
            data: [20],
            backgroundColor: 'rgba(255, 217, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Setembro',
            data: [10],
            backgroundColor: 'rgba(0, 255, 94, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Outubro',
            data: [5],
            backgroundColor: 'rgba(0, 195, 255, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'black',
              callback: (value: any) => `R$ ${value.toLocaleString('pt-BR')}`,
            },
          },
          y: {
            ticks: {
              color: 'black',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
            },
          },
        },
      },
    };

    this.chart2 = {
      type: 'bar',
      data: {
        labels: ['Pacientes'],
        datasets: [
          {
            label: 'Julho',
            data: [60],
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Agosto',
            data: [20],
            backgroundColor: 'rgba(255, 217, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Setembro',
            data: [10],
            backgroundColor: 'rgba(0, 255, 94, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Outubro',
            data: [5],
            backgroundColor: 'rgba(0, 195, 255, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'black',
              callback: (value: any) => `R$ ${value.toLocaleString('pt-BR')}`,
            },
          },
          y: {
            ticks: {
              color: 'black',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
            },
          },
        },
      },
    };

    this.chart3 = {
      type: 'bar',
      data: {
        labels: ['Pacientes'],
        datasets: [
          {
            label: 'Julho',
            data: [60],
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Agosto',
            data: [20],
            backgroundColor: 'rgba(255, 217, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Setembro',
            data: [10],
            backgroundColor: 'rgba(0, 255, 94, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Outubro',
            data: [5],
            backgroundColor: 'rgba(0, 195, 255, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'black',
              callback: (value: any) => `R$ ${value.toLocaleString('pt-BR')}`,
            },
          },
          y: {
            ticks: {
              color: 'black',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
            },
          },
        },
      },
    };
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.someInput.nativeElement, this.chart);
    this.chart2 = new Chart(this.someInput2.nativeElement, this.chart2);
    this.chart3 = new Chart(this.someInput3.nativeElement, this.chart3);
  }
}
