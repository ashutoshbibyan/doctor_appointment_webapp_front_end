import { Injectable } from "@angular/core";
import { RequestOptions, Headers, Http, URLSearchParams } from "@angular/http";
import { Doctor } from "./doctor";
import { Appointment } from "../model/appointment";
import { Hours } from "../model/hours";
import { Day } from "../model/day";
import { Observable } from "rxjs";
import { CommonService } from "../common/common_service"
import { LocalTime } from "js-joda";
import { UserFile } from "../model/userfile";



@Injectable()

export class DoctorService {

    headers: Headers = new Headers( { 'Content-Type': 'application/json' } );
    commOptions: RequestOptions = new RequestOptions( { headers: this.headers } );


    constructor( private http: Http, private commonService: CommonService ) {

    }

    /* save doctor method save the new doctor object using the signup method 
     * of the backend */

    public saveDoctor( doctor: Doctor ) {
        let url = "/api/private/dr/signup";
        return this.http.post( url, doctor, this.commOptions );
    }


    /*savedoctorobject method save the existing doctor object in the database */

    public saveDoctorObject( doctor: Doctor ) {
        let url = "/api/private/dr/save";
        return this.http.post( url, doctor, this.commOptions );
    }




    public docAppointmentSetup( doctor: Doctor ) {
        let url = "/api/private/dr/appointment/setup";
        return this.http.post( url, doctor, this.commOptions );
    }

    public getAllState() {
        let url = "/api/public/dr/state/all";
        return this.http.get( url, this.commOptions );
    }

    public addHolidays( doctor: Doctor ) {
        let url = "/api/private/dr/holiday/add";
        return this.http.post( url, doctor, this.commOptions );
    }


    public getAllCities( stateId: string ) {
        let url = "/api/public/dr/city/all";
        let param = new URLSearchParams();
        param.set( "stateId", stateId );
        this.commOptions.params = param;
        return this.http.get( url, this.commOptions );
    }


    public getAllDegree() {
        let url = "/api/public/dr/degree/all";
        return this.http.get( url, this.commOptions );
    }


    public getAllSpeciality() {
        let url = "/api/public/dr/speciality/all";
        return this.http.get( url, this.commOptions );
    }


    public getAllHoliday() {
        let url = "/api/public/dr/holiday/all";
        return this.http.get( url, this.commOptions );
    }


    public getDoctorPublicInfo() {
        let url = "/api/public/dr/get/doctor";
        return this.http.get( url, this.commOptions );
    }

    public makeAppointment( appointment: Appointment ) {
        let url = "/api/private/dr/appointment/make";
        return this.http.post( url, appointment, this.commOptions );
    }

    public getDocAppointment() {
        let url = "/api/private/dr/get/appointment";
        return this.http.get( url, this.commOptions );
    }

    /**getAppointmentOfPeriod method gets the appointment between a period and it sends result in pages
     * format pageno and pagesize are get by parameter */

    public getAppointmentOfPeriod( from: Date, to: Date, pageNo: number, pageSize: number ) {
        let url = "/api/private/dr/get/appointment/period";
        let param = new URLSearchParams();
        param.set( "from", from.getTime().toString() );
        param.set( "to", to.getTime().toString() );
        param.set( "pageNo", pageNo.toString() );
        param.set( "pageSize", pageSize.toString() );
        this.commOptions.params = param;

        return this.http.get( url, this.commOptions );


    }


    /** getholidayofperiod method get the list of holidays between a time period */

    public getHolidayOfPeriod( from: Date, to: Date ) {
        let url = "/api/private/dr/get/holiday/period";
        let param = new URLSearchParams();
        param.set( "from", from.getTime().toString() );
        param.set( "to", to.getTime().toString() );

        this.commOptions.params = param;

        return this.http.get( url, this.commOptions );

    }

    /** getTodayAppointment get the appointment of today it takes two parameter pageno and pagesize 
     *  and send that page full of today's appointment */

    public getTodayAppointment( pageNo: number, pageSize: number ) {
        let url = "/api/private/dr/get/appointment/today";

        let param = new URLSearchParams();
        param.set( "pageNo", pageNo.toString() );
        param.set( "pageSize", pageSize.toString() );
        this.commOptions.params = param;

        return this.http.get( url, this.commOptions );
    }

    /** saveWorkingDays method save the workingDays value to doctor object in database*/

    public saveWorkingDays( workingDays: Day[] ) {
        let url = "/api/private/dr/save/workingdays";
        let doctor: Doctor = new Doctor();

        doctor.workingDays = workingDays;

        return this.http.post( url, doctor, this.commOptions );
    }



    //    /** fromLocalTimeToString method takes array of string which contain two string value one is for hour 
    //     *  and another is for minute and resturn the combined string value of time where hour and minute are 
    //     *  seperated by :*/
    //    fromLocalTimeToString( time: string[] ) {
    //
    //        let result: string;
    //
    //        // if its less than 10 its single digit so we add 0 before it 
    //        if ( parseInt( time[0] ) < 10 ) {
    //
    //
    //
    //            if ( parseInt( time[1] ) == 0 ) {
    //                result = "0" + time[0] + ":" + "0" + time[1];
    //
    //            }
    //            else {
    //                result = "0" + time[0] + ":" + time[1];
    //
    //            }
    //
    //        }
    //        else {
    //            // if its 0 its single digit 0 so we add 0 so it become 00
    //            if ( parseInt( time[1] ) == 0 ) {
    //                result = time[0] + ":" + "0" + time[1];
    //            }
    //
    //            else {
    //                result = time[0] + ":" + time[1];
    //            }
    //
    //        }
    //
    //        return result;
    //    }


    /** getTimeLabel method takes the array of string which is got from database and convert it to 
     *  time lable according to hourListOptions file */

    //    getTimeLabel( hour: string[] ) {
    //        return this.commonService.getTimeLabel( this.fromLocalTimeToString( hour ) );
    //    }


    /** patient exist method takes patient id as parameter and checks if the patient exist in 
     *  database or not */
    patientExist( patientId: string ) {
        let url: string = "/api/private/dr/patient/exist";
        let param: URLSearchParams = new URLSearchParams();
        param.set( "patientId", patientId );
        this.commOptions.params = param;
        return this.http.get( url, this.commOptions );
    }

    /** getPatientData method takes the patient id as a parameter and return the patient object 
     *  as a result */

    getPatientData( patientId: string ) {
        let url: string = "/api/public/get/patient";
        let param: URLSearchParams = new URLSearchParams();
        param.set( "patientId", patientId );
        this.commOptions.params = param;
        return this.http.get( url, this.commOptions );
    }

    /** getDocUsingId method takes the doctor id as the parameter and return the doctor object */

    getDocUsingId( docId: string ) {

        let url: string = "/api/public/dr/get/profile";
        let param: URLSearchParams = new URLSearchParams();
        param.set( "docId", docId );
        this.commOptions.params = param;
        return this.http.get( url, this.commOptions );


    }

    /* deleteHoliday delete the holiday from the list of holidays it takes date as parameter 
     *@param Date (date to be deleted)*/
    deleteHoliday( date: Date ) {
        let url = "/api/private/dr/delete/holiday";


        return this.http.post( url, date, this.commOptions );


    }


    /**saveDoctorProfileImage method takes the UserFile object and 
     * save the image as profile image for the user */

    saveDoctorProfileImage( image: UserFile ) {
        let url = "/api/private/dr/change/profileimg";

        return this.http.post( url, image, this.commOptions );
    }


    /** getappointment method takes appointmentid as parameter and return the appointment
     *  object for that appointment if the doctor is authorised to get the information 
     *  else return null*/

    getAppointment( appointmentId: string ) {
        let url = "/api/private/dr/get/appointment/id";
        let param: URLSearchParams = new URLSearchParams();
        param.set( "appointmentId", appointmentId );
        this.commOptions.params = param;

        return this.http.get( url, this.commOptions );
    }

    /** savePrescription method takes the appointment object with prescription and save it 
     *  into the database 
     *  */
    savePrescription( appointment: Appointment ) {
        let url = "/api/private/dr/save/prescription";

        return this.http.post( url, appointment, this.commOptions );
    }

}