import { Component } from '@angular/core';
import {GraphDataService} from '../app/service/graph-data.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
 
})
export class AppComponent {
  
  title = 'gasChart';
  seriesObj : any;
  seriesData : any;
  showgraph = false;
  noData = true;
  loading = false;

  payload : any = {
    countryId: [],
    fromDate:  '',
    toDate :  '',
    category: ''
  
  }

  constructor(
    private graphData: GraphDataService) {}

  
  chartData:any = {
    series: [],
    xAxis: 'Year',
    yAxis:  '',
    height: window.innerHeight * 55/ 100,
    width : window.innerWidth * 80 /100,
    tickAmount: 12,
    legend: true
  };

  date = [
      { id: 1, name: '1990' },
      { id: 2, name: '1991' },
      { id: 3, name: '1992' },
      { id: 4, name: '1993' },
      { id: 5, name: '1994' },
      { id: 6, name: '1995' },
      { id: 7, name: '1996' },
      { id: 8, name: '1997' },
      { id: 9, name: '1998' },
      { id: 10, name: '1999' },
      { id: 11, name: '2000' },
      { id: 12, name: '2001' },
      { id: 13, name: '2002' },
      { id: 14, name: '2002' },
      { id: 15, name: '2003' },
      { id: 16, name: '2004' },
      { id: 17, name: '2005' },
      { id: 18, name: '2006' },
      { id: 19, name: '2007' },
      { id: 20, name: '2008' },
      { id: 21, name: '2009' },
      { id: 22, name: '2010' },
      { id: 23, name: '2011' },
      { id: 24, name: '2012' },
      { id: 25, name: '2013' },
      { id: 26, name: '2014' },

  ];

  countries = [
    
    {  name: 'Australia' },
    {  name: 'Austria' },
    {  name: 'Belarus' },
    {  name: 'Belgium' },
    {  name: 'Bulgaria' },
    {  name: 'Canada' },
    {  name: 'Croatia' },
    {  name: 'Cyprus' },
    {  name: 'Czech Republic' },
    {  name: 'Denmark' },
    {  name: 'Estonia' },
    {  name: 'European Union' },
    {  name: 'Finland' },
    {  name: 'France' },
    {  name: 'Germany' },
    {  name: 'Greece' },
    {  name: 'Hungary' },
    {  name: 'Iceland' },
    {  name: 'Ireland' },
    {  name: 'Italy' },
    {  name: 'Japan' },
    {  name: 'Latvia' },
    {  name: 'Liechtenstein' },
    {  name: 'Lithuania' },
    {  name: 'Luxembourg' },
    {  name: 'Malta' },
    {  name: 'Monaco' },
    {  name: 'Netherlands' },
    {  name: 'New Zealand' },
    {  name: 'Norway' },
    {  name: 'Poland' },
    {  name: 'Portugal' },
    {  name: 'Romania' },
    {  name: 'Russian Federationlta' },
    {  name: 'Slovakia' },
    {  name: 'Slovenia' },
    {  name: 'Spain' },
    {  name: 'Sweden' },
    {  name: 'Switzerland' },
    {  name: 'Turkey' },
    {  name: 'Ukraine' },
    {  name: 'United Kingdom' },
    {  name: 'United States of America' },  
  ];

  category = [
    {  name: 'CO2' },
    {  name: 'GHGS' },
    {  name: 'HFCS' },
    {  name: 'CH4' },
    {  name: 'NF3' },
    {  name: 'N2o' },
    {  name: 'PFCS' },
    {  name: 'SF6' },
  ];

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

      if(this.payload['category']){
        this.chartData['yAxis'] = this.payload['category'];
      }

      this.showgraph =  true;

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
    }, 2000);

  }

  clearData(){
    this.payload = {};
    this.showgraph = false;
    this.noData = true;
  }

}
