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
    {data: [65, 0, 0, 0], label: 'Series A'}
  ];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.initCounters();
  }

  initCounters() {
    console.log('here');
    this.dataService.getCounters()
      .subscribe(response => {
        this.barChartData[0].data = [];
        const newData = [];
        const newLabel = [];
        console.log('response.result : ', response.result);
        console.log('response.result.length : ', response.result.length);
        for (let i = 0; i < response.result.length; i++) {

          this.barChartData[0].data.push((response.result[i].total / response.result[i].count) * 100);
          // this.barChartData[0].label.push((response.result[i].total / response.result[i].count) * 100);

          console.log('here newData : ', newData);
          newData.push({
            data: [],
            label: response.result[i].quiz_id.name
          });
          newLabel.push(response.result[i].quiz_id.name);
          // this.barChartData = newData;
          this.barChartLabels = newLabel;
          console.log('this.barChartData : ', this.barChartData);
          console.log('this.barChartLabels : ', this.barChartLabels);
          // }
        }
      });
  }
}
