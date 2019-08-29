import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          max : 100
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public colors = [
    {
      backgroundColor: [
        '#A3A1FB',
        '#A3A1AB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB'
      ]
    }];

  public barChartData: ChartDataSets[] = [
    {data: [65, 0, 0, 0], label: 'Average Score ( % )'}
  ];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.initCounters();
  }

  initCounters() {
    this.dataService.getCounters()
      .subscribe(response => {
        this.barChartData[0].data = [];
        const newData = [];
        const newLabel = [];
        for (let i = 0; i < response.result.length; i++) {
          this.barChartData[0].data.push(response.result[i].total / response.result[i].count);
          newData.push({
            data: [],
            label: response.result[i].quiz_id.name
          });
          newLabel.push(response.result[i].quiz_id.name);
          this.barChartLabels = newLabel;
          // }
        }
      });
  }
}
