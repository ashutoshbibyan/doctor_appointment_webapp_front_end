import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HourListOption } from "../model/hourListOptions";
import { LocalTime, DateTimeFormatter } from "js-joda";


@Injectable()
export class CommonService {

    hourListOption = HourListOption;

    headers: Headers = new Headers( { 'Content-Type': 'application/json' } );
    commOptions: RequestOptions = new RequestOptions( { headers: this.headers } );


    constructor( private http: Http ) {

    }

    /** getAllState method get all the state list present in database */

    public getAllState() {
        let url = "/api/public/dr/state/all";
        return this.http.get( url, this.commOptions );
    }

    /** getAllCities method get all the cities for a perticular state */

    public getAllCities( stateId: string ) {
        let url = "/api/public/dr/city/all";
        let param = new URLSearchParams();
        param.set( "stateId", stateId );
        this.commOptions.params = param;
        return this.http.get( url, this.commOptions );
    }

    /** getTimeLabel get the label value for a time the label value is for display only */
    getTimeLabel( value: string ): string {
        for ( let i = 0; i < this.hourListOption.length; i++ ) {

            if ( this.hourListOption[i].value == value ) {
                return this.hourListOption[i].label;
            }
        }

        return "";
    }


    public getAllDegree() {
        let url = "/api/public/dr/degree/all";
        return this.http.get( url, this.commOptions );
    }


    public getAllSpeciality() {
        let url = "/api/public/dr/speciality/all";
        return this.http.get( url, this.commOptions );
    }

    /** uploadImage upload the image in user database */
    public uploadImage( formData ) {

        let url: string = "/api/private/upload/image";

        console.log( formData );

        return this.http.post( url, formData );

    }

    /** getUserImages get all the images from the current logged in user*/
    public getUserImages( pageNo: number, pageSize: number ) {
        let url = "/api/private/user/get/images";

        let param: URLSearchParams = new URLSearchParams();

        param.set( "pageNo", pageNo.toString() );
        param.set( "pageSize", pageSize.toString() );

        this.commOptions.params = param;


        return this.http.get( url, this.commOptions );
    }




}