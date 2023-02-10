import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements OnInit {
  @Input() values: number[] = [];
  @Input() label: string = 'value';
  public chart!: Chart

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    this.chart = new Chart("lineChart", {
      type: 'line', //this denotes tha type of chart

      data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: this.label,
            data: this.values,
          },
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          }
        }
      }

    });
  }

}
