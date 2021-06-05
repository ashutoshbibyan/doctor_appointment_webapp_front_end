import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Disease } from "../model/disease";
import { Degree } from "../model/degree";
import { State } from "../model/state";
import { Speciality } from "../model/speciality";
import { City } from "../model/city";
import {MatSnackBar} from "@angular/material";


@Injectable()
export class SiteAdminService {



    headers: Headers = new Headers( { 'Content-Type': 'application/json' } );
    commOptions: RequestOptions = new RequestOptions( { headers: this.headers } );

    constructor( private http: Http ) {

    }


    saveDisease( disease: Disease ) {
        let url = "/api/private/admin/disease/add";
        return this.http.post( url, disease, this.commOptions );
    }


    addState( state: State ) {
        let url = "/api/private/admin/state/add";
        return this.http.post( url, state, this.commOptions );
    }

    getAllState() {
        let url = "/api/public/state/all";
        return this.http.get( url, this.commOptions );
    }

    getAllCity( stateId: string ) {
        let url = "/api/public/city/all";
        let param: URLSearchParams = new URLSearchParams();
        param.set( "stateId", stateId );
        this.commOptions.params = param;
        return this.http.get( url, this.commOptions );
    }

    addCity( city: City, stateId: string ) {
        let url = "/api/private/admin/city/add";
        let body = { "city": city, "stateId": stateId };

        return this.http.post( url, body, this.commOptions );
    }


    addDegree( degree: Degree ) {
        let url = "/api/private/degree/add";
        return this.http.post( url, degree, this.commOptions );

    }

    getAllDegree() {
        let url = "/api/public/degree/all";
        return this.http.get( url, this.commOptions );
    }

    getAllDisease() {
        let url = "/api/public/disease/all";
        return this.http.get( url, this.commOptions );
    }

    addSpeciality( speciality: Speciality ) {
        let url = "/api/private/speciality/add";
        return this.http.post( url, speciality, this.commOptions );
    }


    // remove state method remove the state from database it takes one parameter stateId 
    // and remove the state with that stateid
    removeState(stateId:string){
        let url="/api/private/admin/delete/state";

        let param:URLSearchParams= new URLSearchParams();
        param.set("stateId",stateId);
        this.commOptions.params=param;
        return this.http.delete(url,this.commOptions);
    }

    /** removeDisease method remove the disease from the database it takes one parameter 
     *  diseaseId and remove that disease from database
     */
    removeDisease(diseaseId:string){
        let url="/api/private/admin/delete/disease";
        let param:URLSearchParams = new URLSearchParams();
        param.set("diseaseId",diseaseId);
        this.commOptions.params=param;
        return this.http.delete(url,this.commOptions);
    }


    /** removeDegree method remove the degree from the database it takes one parameter
     *  degreeId and remove it from the database
     */

     removeDegree(degreeId:string){
         let url="/api/private/admin/delete/degree";
         let param:URLSearchParams= new URLSearchParams();
         param.set("degreeId",degreeId);
         this.commOptions.params=param;
         return this.http.delete(url,this.commOptions);
     }
  
     /** removeCity method remove the city from database it take stateId and newCityList 
      *  as parameter and remove old list with the new one 
      */

      removeCity(newCityList:City[],stateId:string){
        
        let url="/api/private/admin/delete/city";
        let param:URLSearchParams=new URLSearchParams();
        param.set("stateId",stateId);
        this.commOptions.params=param;

        return this.http.post(url,newCityList,this.commOptions);


      }

      /** removeSpeciality remove a speciality from the database it takes single parameter 
       *  which is the specialityName and remove the speciality with that name 
       */

       removeSpeciality(specialityName:string){
           let url="/api/private/admin/delete/speciality";
           let param:URLSearchParams = new URLSearchParams();
           param.set("specialityName",specialityName);
           this.commOptions.params=param;
           return this.http.delete(url,this.commOptions);
       }

}