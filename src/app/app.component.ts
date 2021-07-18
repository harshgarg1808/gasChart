import { Component, OnInit } from '@angular/core';
import {GraphDataService} from '../app/service/graph-data.service'
import {jsonFile} from  '../app/json/jsonFile'
import { ActivatedRoute } from '@angular/router';
import { Loader } from "@googlemaps/js-api-loader"

//API Key
import {config} from '../environments/config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
 
})
export class AppComponent implements OnInit {
  
  //Variables
  jsonObj: any = jsonFile;
  title = 'gasChart';
  seriesObj : any;
  seriesData : any;
  showgraph = false;
  noData = true;
  loading = false;
  date: any = []
  countries: any = []
  category: any = []
  coordinates: any = []
  payload : any = {}

  //Chart Data
  chartData:any = {
    series: [],
    xAxis: 'Year',
    yAxis:  '',
    height: window.innerHeight * 50/ 100,
    width : window.innerWidth * 60 /100,
    tickAmount: 12,
    legend: true
  };
  
  constructor(
    private graphData: GraphDataService,
    private route: ActivatedRoute) {}
  
    
  ngOnInit(): void {
    
    //GET PAGE INFO   
    this.date = this.jsonObj.date;
    this.countries = this.jsonObj.countries;
    this.category = this.jsonObj.category;
    this.payload = this.jsonObj.payload;
    this.coordinates = this.jsonObj.coordinates;

    this.getgraphData()

    //Attempting URL State Filter

    // this.route.queryParams.subscribe(queryParams => {   
    //   this.payload['countryId'] = queryParams.countryId;
    //   this.payload['fromDate'] = queryParams.fromDate;
    //   this.payload['toDate'] = queryParams.toDate;
    //   this.payload['category'] = queryParams.category;
    // });

    //Maps Loader
    let loader = new Loader({
      apiKey: config.apiKey,
    });

    loader.load().then(() => {
        this.callMaps( this.coordinates )
    })

  }

  //Maps Data
  callMaps( locations : any ){
    
    let myLatlng = new google.maps.LatLng(0,10);
    let mapOptions = {
      zoom: 1,
      center: myLatlng
    }
    let map = new google.maps.Map(document.getElementById("map")  as HTMLElement, mapOptions);

    for (var i = 0; i < locations.length; i++) {  
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].data.lat, locations[i].data.long),
        map: map,
        title: locations[i].name
      });
      marker.setMap(map);
    }
  }

  map(){
    this.coordinates = this.graphData.getMapData(this.payload)
    this.callMaps(this.coordinates);
  }

  // GraphData
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

  //Search
  search(){
    this.showgraph = false;
    this.noData = false;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.getgraphData();
    }, 500);
  }

  // ClearData 
  clearData(){
    this.payload = {
      countryId: [],
      fromDate:  null,
      toDate :  null,
      category: null
    };
    this.showgraph = false;
    this.noData = true;
    this.map();
    console.log(this.payload);
  }

}
