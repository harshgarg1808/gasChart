import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexDataLabels,
  ApexMarkers,
  ApexPlotOptions,
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  stroke?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  yaxis?: ApexYAxis | any;
  legend?: ApexLegend | any;
  dataLabels?: ApexDataLabels | any;
  markers?: ApexMarkers | any;
  plotOptions?: ApexPlotOptions | any;
};

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.sass']
})
export class LineGraphComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;
  @Input() chartData!: any;
  totalArr = <any>[];

  constructor() { }

  ngOnInit(): void {
    for (var i = 0; i < this.chartData["series"].length; i++) {
      this.totalArr = this.totalArr.concat(this.chartData["series"][i].data);
    }
      
    this.chartOptions = {
      series: this.chartData["series"],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      chart: {
        type: "line",
        height: this.chartData["height"],
        width: this.chartData["width"],
        zoom: {
          enabled: false,
        },
        
      },
      
      // dataLabels: {
      //   enabled: true,
      //   enabledOnSeries: this.chartData['datalabels'],
      //   offsetY: -6,
      //   background: {
      //     enabled: false,
      //   },  
      // },
      
      markers: {
        size: 6,
        hover: {
          size: 5,
          sizeOffset: 2
        }
      },
      xaxis: {
        title: {
          text: this.chartData["xAxis"],
        },
        tickAmount: this.chartData['tickAmount']
      },
      yaxis: {
        decimalsInFloat: 0,
        title: {
          text: this.chartData["yAxis"],
        },
        tickAmount: this.chartData['tickAmount']
      },      
      legend: {
        show: this.chartData["legend"],
        showForSingleSeries: true,
        position: "top",
        fontSize: '14px',
        itemMargin: {
          horizontal: 10,
          vertical: 0
        },
      },
      
    };
  
  }
}
