import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DoctorService } from "../dr/doctor_service";
import { Doctor } from "../dr/doctor";
import { Hours } from "../model/hours";
import { Day } from "../model/day";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDatepickerInputEvent, MatSnackBar } from "@angular/material";
import { CommonService } from "../common/common_service";
import { PatientService } from "./patient_service";
import { Router } from "@angular/router";


@Component( {
    templateUrl: "./html/make_appointment.html"

} )
export class MakeAppointment {

    doctor: Doctor = new Doctor();

    docName: FormControl = new FormControl( { value: "test", disabled: true }, [] );

    appointmentDate: FormControl = new FormControl( '', [] );

    appointmentTime: FormControl = new FormControl( '', [] );

    appointmentForm: FormGroup;

    paymentForm:FormGroup;

    holidayFilter;

    currentDate: Date = new Date();

    hours: Hours[] = new Array();

    workingDays: Day[] = new Array();

    holidays: Date[] = new Array();

    constructor( private acRoute: ActivatedRoute, private doctorService: DoctorService,
        private formBuilder: FormBuilder, private commonService: CommonService,
        private patientService: PatientService, private matSnackBar: MatSnackBar ,
        private router:Router ) {

    }







    ngOnInit() {

        this.patientService.isSignupComplete();


        this.appointmentForm = this.formBuilder.group( {

            "docName": this.docName,
            "appointmentDate": this.appointmentDate,
            "appointmentTime": this.appointmentTime
        } );


        this.acRoute.params.subscribe(( data ) => {

            if ( data != undefined ) {
                this.getDoctor( data.docId );
            }
        } );
    }


    getDoctor( docId: string ) {
        this.doctorService.getDocUsingId( docId ).subscribe(( data ) => {

            if ( data != undefined ) {
                this.doctor = data.json();
                this.docName.setValue( this.doctor.name );
                this.workingDays = this.doctor.workingDays;
                this.holidays = this.doctor.holidays;

                //filter value is changed whenever the doctor's value is changed
                this.holidayFilter = ( selectedDate: Date ): boolean => {

                    let day: number = selectedDate.getDay();
                    let result: boolean = false;

                    if ( this.workingDays ) {

                        for ( let i = 0; i < this.workingDays.length; i++ ) {
                            if ( day == this.workingDays[i].dayId ) {
                                result = true;
                            }



                        }

                    }

                    if ( this.holidays ) {

                        for ( let i = 0; i < this.holidays.length; i++ ) {


                            let holiday: Date = this.holidays[i];

                            if ( selectedDate.getTime() == parseInt( holiday.toString() ) * 1000 ) {

                                result = false;

                            }
                        }


                    }

                    return result;
                };

            }

        } );
    }


    /** dateSelected method execute when user select the date and change the time slots available at that day*/

    dateSelected( event: MatDatepickerInputEvent<Date> ) {


        for ( let i = 0; i < this.workingDays.length; i++ ) {
            if ( this.workingDays[i].dayId == event.value.getDay() ) {

                this.hours = this.workingDays[i].hours;
            }
        }

    }


    getAppointmentLeft() {
        this.patientService.getAppointmentBooked( this.doctor.docId,
            this.appointmentDate.value, this.appointmentTime.value )
            .subscribe(( data ) => {
                if ( data != undefined ) {
                    console.log( data.json() );
                    let appointment = data.json();
                    let appointmentLeft = this.appointmentTime.value.maxPatientNo - appointment;

                    if ( appointmentLeft > 0 ) {
                        this.matSnackBar.open( "Appointment Left " + appointmentLeft, "Hurry", {
                            duration: 3000
                        } );
                    }

                    else {
                        this.matSnackBar.open( "Appointment Full Choose Another Date & Time", "Sorry", {
                            duration: 3000
                        } );
                    }



                }
            } );
    }


}