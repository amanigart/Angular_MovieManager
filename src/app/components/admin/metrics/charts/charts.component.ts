import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsComponent } from '../metrics.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  data!: any;
  options!: any;

  constructor() { }

  ngOnInit(): void {
    this.data = {
      labels: ['07/05', '08/05', '09/05', '10/05', '11/05', '12/05 ', '13/05'],
            datasets: [
                {
                    label: 'Comments',
                    data: [0, 3, 0, 1, 3, 4, 0],
                    borderColor: 'hotpink'
                }
            ]
    }

    this.options = {
      title: {
          display: true,
          text: 'My Title',
          fontSize: 16
      },
      legend: {
          position: 'bottom'
      }
    };
  }

}
