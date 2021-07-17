import { Component } from '@angular/core';
import {GraphDataService} from '../app/service/graph-data.service'
import {jsonFile} from  '../app/json/jsonFile'
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
 
})
export class AppComponent {
  jsonObj: any = jsonFile;

  title = 'gasChart';
  seriesObj : any;
  seriesData : any;
  showgraph = false;
  noData = true;
  loading = false;

  payload : any = {
    countryId: ["Australia"],
    fromDate:  '1990',
    toDate :  '1991',
    category: 'CO2'
  
  }

  constructor(
    private graphData: GraphDataService,
    private route: ActivatedRoute) {}

  
  
  chartData:any = {
    series: [],
    xAxis: 'Year',
    yAxis:  '',
    height: window.innerHeight * 55/ 100,
    width : window.innerWidth * 80 /100,
    tickAmount: 12,
    legend: true
  };

 //Default values
  date = [
    { id: 1, name: '1990' },

  ];
  countries = [
    {  name: 'Australia' },
  ];
  category = [
    {  name: 'CO2' },
  ];

  ngOnInit(): void {
    //GET PAGE INFO
    
    this.date = this.jsonObj.date;
    this.countries = this.jsonObj.countries;
    this.category = this.jsonObj.category;
  
    this.getgraphData()

    // this.route.queryParams.subscribe(queryParams => {
     
    //   this.payload['countryId'] = queryParams.countryId;
    //   this.payload['fromDate'] = queryParams.fromDate;
    //   this.payload['toDate'] = queryParams.toDate;
    //   this.payload['category'] = queryParams.category;

    // });

  }

 

  getgraphData(){

    this.showgraph = false;
    this.noData = false;

    this.chartData['series'] = [];
    console.log(  "country ID",this.payload );
    
    if(this.payload === null){
      this.noData = true;
    }

    if( this.payload['fromDate'] > this.payload['toDate']){
      this.noData = true;
    }

    else{
      this.chartData['series'] = this.graphData.findData(this.payload);

      if(this.chartData['series'].length === 0){
        this.noData = true;
        this.showgraph = false;
      }else{
        this.showgraph =  true;
        this.noData = false;
      }

      if(this.payload['category']){
        this.chartData['yAxis'] = this.payload['category'];
      }

      

      console.log("series" , this.chartData['series']);
    }
  
  }

  search(){
    this.showgraph = false;
    this.noData = false;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.getgraphData();
    }, 500);

    // this.getgraphData()
  }

  clearData(){
    this.payload = {
      countryId: [],
      fromDate:  null,
      toDate :  null,
      category: null
    };
    this.showgraph = false;
    this.noData = true;
    console.log(this.payload);
    
  }

}
