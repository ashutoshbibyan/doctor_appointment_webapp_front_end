import { Component } from "@angular/core";
import { DoctorService } from "./doctor_service";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Router} from "@angular/router";


@Component( {
    selector: "doc-holiday-show",
    templateUrl: "./html/doctor_holiday_show.html",
    styleUrls: ["./css/doctor_holiday_show.css"]
} )
export class DoctorHolidayShow {

    holidayList: Date[] = new Array();

    dateForm: FormGroup;

    from: FormControl = new FormControl( "", [
        Validators.required
    ] );

    to: FormControl = new FormControl( "", [
        Validators.required
    ] );


    constructor( private doctorService: DoctorService, private formBuilder: FormBuilder ,
    private router:Router) {

    }

    ngOnInit() {
        //this.getAllHoliday();

        this.dateForm = this.formBuilder.group( {
            from: this.from,
            to: this.to

        } );

        this.doctorService.getDoctorPublicInfo().subscribe((data)=>{
            if(data!=undefined){
                if(data["_body"]==""){
                    this.router.navigateByUrl("/dr/home/dr/signup");
                }
            }
        });

    }

    getAllHoliday() {

        this.doctorService.getAllHoliday().subscribe(( data ) => {
            if ( data != undefined ) {
                this.holidayList = data.json();
            }
        } );
    }

    submit() {
        let from: Date = this.dateForm.value.from;
        let to: Date = this.dateForm.value.to;
        this.getHolidayOfPeriod( from, to );

    }


    /** getHolidayOfPeriod get the holiday between two period it takes two date parameter 
     *  and return the list of holidays between them */

    getHolidayOfPeriod( from: Date, to: Date ) {
        this.doctorService.getHolidayOfPeriod( from, to ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.holidayList = data.json();
                console.log( data.json() );

            }
        } );
    }

    deleteHoliday( date: Date ) {
        this.doctorService.deleteHoliday( date ).subscribe(( data ) => {
            if ( data != undefined ) {
                console.log( data.json() );
                if ( data.json().result ) {
                    let from: Date = this.dateForm.value.from;
                    let to: Date = this.dateForm.value.to;
                    this.getHolidayOfPeriod( from, to );
                }
            }
        } );
    }
}