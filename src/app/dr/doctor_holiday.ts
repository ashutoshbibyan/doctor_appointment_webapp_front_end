import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { DoctorService } from "./doctor_service";
import { Doctor } from "./doctor";
import { FormResult } from "../model/formresult";
import { Router } from "@angular/router";

@Component( {
    selector: "doc-holiday",
    templateUrl: "./html/doctor_holiday.html"
} )

export class DoctorHoliday {


    holidayForm: FormGroup;

    currentDate: Date = new Date();

    result: FormResult = new FormResult();

    holidayDate: FormControl = new FormControl( '', [

    ] );

    // holds the list of date to be added into  data base
    holidayDates: Date[] = new Array();

    constructor( private formBuilder: FormBuilder, private doctorService: DoctorService ,
    private router:Router) {


    }


    ngOnInit() {

        // form initiolization 
        this.holidayForm = this.formBuilder.group(
            {
                holidayDate: this.holidayDate
            } );

        this.doctorService.getDoctorPublicInfo().subscribe((data)=>{
            if(data!=undefined){
                if(data["_body"]==""){
                    this.router.navigateByUrl("/dr/home/dr/signup");
                }
            }
        });
    }


    addHoliday() {
        let error: boolean = false;

        /*date selected by the user if empty its a string else date 
          thats why we did not choose any data type for selectedDate */

        let selectedDate: Date = this.holidayForm.value.holidayDate;



        // here we are checking if the date is less than min date which is current date 
        if ( this.holidayDate.hasError( "matDatepickerMin" ) ) {
            error = true;
        }

        //here we are checking if the date is already in the array
        for ( let i = 0; i < this.holidayDates.length; i++ ) {
            if ( this.holidayDates[i] == selectedDate ) {
                error = true;
            }
        }

        // if date is not empty and not in the array then we are adding it into array
        if ( !error ) {
            let date: Date = new Date( selectedDate.toISOString() );

            this.holidayDates.push( date );

        }

    }


    submit() {
        let doctor: Doctor = new Doctor();

        doctor.holidays = this.holidayDates;

        console.log( doctor );
        this.doctorService.addHolidays( doctor ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.result = data.json();
            }
        } );
    }




    // delete the date from the array using the index
    deleteDate( i: number ) {
        this.holidayDates.splice( i, 1 );
    }
}