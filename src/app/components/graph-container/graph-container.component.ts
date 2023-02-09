import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements OnInit {
  public chart!: Chart

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){

    this.chart = new Chart("lineChart", {
      type: 'line', //this denotes tha type of chart

      data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: "Temperature",
            data: ['1','6', '7', '8', '11', '5', '3', '4'],
          },
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        // aspectRatio: 2.5,
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
