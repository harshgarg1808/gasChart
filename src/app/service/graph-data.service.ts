import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import {jsonFile} from  '../json/jsonFile'

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  jsonObj: any = jsonFile;

  constructor() { }


  findData(payload : any): any {
    var seriesArr: any = [];
    
    if(payload['countryId'].length === 0 || payload['fromDate'] === null || payload['toDate'] === null || payload['category'] === null){
      console.log("empty");
      return [];
    }

    for(var j =0 ; j < payload['countryId'].length ; j++){

     var seriesData: any = {
        data : [],
        name: '',
        type: ''
      };

      for(var i = 0 ; i<this.jsonObj.series.length; i++){

        if(payload['countryId'][j] === this.jsonObj.series[i].name){
          
          seriesData['name'] = this.jsonObj.series[i].name;
          seriesData['type'] = this.jsonObj.series[i].type;
          seriesData['data'] = this.getData( this.jsonObj.series[i].data , payload['fromDate'] , payload['toDate']) ;
  
          seriesArr.push(seriesData);
          console.log( "seriesARR",seriesArr);
          
        }
  
      }

    }

    return seriesArr;    
  }

  getData(data: any , fromDate : any , toDate: any){

    var objArr : any = [];

    for(var i = 0 ; i<data.length ; i++){

      if(data[i].x >= parseInt(fromDate) && data[i].x <= parseInt(toDate) ){
        objArr.push(data[i]);
      }
    }
    console.log(objArr);

    var sortedArray: { x: number, y : number; }[] = objArr.sort((n1 : any ,n2 : any) => {
      if (n1.x > n2.x) {
          return 1;
      }
  
      if (n1.x < n2.x) {
          return -1;
      }
  
      return 0;
    });    

    return sortedArray;
  }
 
  getMapData(payload : any): any {
    var mapArr: any = [];

    if(payload['countryId'].length === 0){
      console.log("empty");
      return [];
    }
    
    for(var j =0 ; j < payload['countryId'].length ; j++){
 
       for(var i = 0 ; i<this.jsonObj.countries.length; i++){
 
         if(payload['countryId'][j] === this.jsonObj.countries[i].name){
           
          mapArr.push(this.jsonObj.countries[i]);
           
         }
       }
     }

    return mapArr;
  }

}
