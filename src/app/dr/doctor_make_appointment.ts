import { Component } from "@angular/core";
import { Doctor } from "./doctor";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { DoctorService } from "./doctor_service";
import { Time } from "../model/time";
import { holidayValidator } from "./holidayValidator";
import { Appointment } from "../model/appointment";
import { Hours } from "../model/hours";
import { CommonService } from "../common/common_service";
import { FormResult } from "../model/formresult";
import {Router} from "@angular/router";
import { MatDatepickerInputEvent, MatTabChangeEvent, MatSnackBar } from "@angular/material";

@Component( {
    selector: "doc-make-appointment",
    templateUrl: "./html/doctor_make_appointment.html",
    styleUrls: ["./css/doctor_make_appointment.css"]
} )

export class DoctorMakeAppointment {

    doctor: Doctor = new Doctor();
    holidays: Date[] = new Array();

    result: FormResult = new FormResult();

    hours: Hours[] = new Array();

    today: Date = new Date();

    workingDayFilter;


    appointmentForm: FormGroup;

    patientId: FormControl = new FormControl( "", [
        Validators.required
        , Validators.email
    ] );

    date: FormControl = new FormControl( "", [
        Validators.required
    ] );;

    timeSlot: FormControl = new FormControl( "", [
        Validators.required
    ] );

    appointmentWithoutPatientId: FormGroup;

    patientName: FormControl = new FormControl( "", [
        Validators.required
    ] );

    patientPhoneNo: FormControl = new FormControl( "", [
        Validators.required,
        Validators.minLength( 10 )
    ] );

    appointmentDate: FormControl = new FormControl( "", [
        Validators.required
    ] );

    appointmentTimeSlot: FormControl = new FormControl( "", [
        Validators.required
    ] );





    ngOnInit() {

        


        this.appointmentForm = this.formBuilder.group( {
            patientId: this.patientId,
            date: this.date,
            timeSlot: this.timeSlot
        } );


        this.appointmentWithoutPatientId = this.formBuilder.group( {
            patientName: this.patientName,
            patientPhoneNo: this.patientPhoneNo,
            appointmentDate: this.appointmentDate,
            appointmentTimeSlot: this.appointmentTimeSlot
        } );

        this.getDoctor();


    }



    constructor( private formBuilder: FormBuilder, private doctorService: DoctorService
        , private commonService: CommonService, private matSnackBar: MatSnackBar ,
    private router:Router) {

    }

    /** dateselected execute when user select a date and it change the hours value according 
     *  to the day of the date */

    dateSelected( event: MatDatepickerInputEvent<Date> ) {

        let date: Date = event.value;


        for ( let i = 0; i < this.doctor.workingDays.length; i++ ) {
            if ( this.doctor.workingDays[i].dayId == date.getDay() ) {
                this.hours = this.doctor.workingDays[i].hours;
            }
        }


    }
    0


    /** getDoctor method gets the details of the doctor and use it to get information like 
     *  holidays , workingdays and hours */
    public getDoctor() {

        this.doctorService.getDoctorPublicInfo().subscribe(( data ) => {
            if ( data != undefined ) {
                console.log( data );
              if(data["_body"]!=""){

                this.doctor = data.json();

                /* filter is dependent on the doctor object thats why 
                 * it is set here */

                this.workingDayFilter = ( d: Date ): boolean => {
                    const day = d.getDay();
                    let workingDays = this.doctor.workingDays;
                    let holidays = this.doctor.holidays;
                    let result: boolean = false;

                    if ( workingDays != null ) {

                        for ( let i = 0; i < workingDays.length; i++ ) {
                            if ( day == workingDays[i].dayId ) {
                                result = true;
                            }


                        }
                    }



                    if ( holidays != null ) {

                        for ( let i = 0; i < holidays.length; i++ ) {
                            let holiday: Date = holidays[i];

                            if ( d.getTime() == parseInt( holiday.toString() ) * 1000 ) {
                                result = false;
                            }
                        }
                    }



                    return result;

                }


              }
              // doctor object is empty 
              else{
                   this.router.navigateByUrl("/dr/home/dr/signup"); 
              }


            }
        } );
    }


    // open snackbar method takes two parameter message and action and open the matsnackbar

    openSnackBar( message: string, action: string ) {
        this.matSnackBar.open( message, action, {
            duration: 3000,
        } );
    }


    /** execute when user submit the form using patient id */
    submit() {
        let appointment: Appointment = new Appointment();
        appointment.patientId = this.appointmentForm.value.patientId;
        appointment.date = new Date( this.appointmentForm.value.date );
        appointment.dayId = appointment.date.getDay();
        appointment.hours = this.appointmentForm.value.timeSlot;
        console.log( appointment );

        this.doctorService.makeAppointment( appointment ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.result = data.json();
                if ( this.result.result ) {
                    this.openSnackBar( this.result.message, "Done" )
                }
                else {
                    if ( this.result.error ) {
                        this.openSnackBar( this.result.message, "Error" );
                    }
                }
            }
        } );

    }


    /** execute when user submit the form without patient id */
    submitWithoutId() {
        let appointment: Appointment = new Appointment();
        appointment.patientName = this.appointmentWithoutPatientId.value.patientName;
        appointment.patientPhoneNo = this.appointmentWithoutPatientId.value.patientPhoneNo;
        appointment.date = this.appointmentWithoutPatientId.value.appointmentDate;
        appointment.dayId = appointment.date.getDay();
        appointment.hours = this.appointmentWithoutPatientId.value.appointmentTimeSlot;

        this.doctorService.makeAppointment( appointment ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.result = data.json();
                if ( this.result.result ) {
                    this.openSnackBar( this.result.message, "Done" )
                }
                else {
                    if ( this.result.error ) {
                        this.openSnackBar( this.result.message, "Error" );
                    }
                }
            }
        } );
    }


    /** tabChanged execute when user choose any tab it reset all the field of previous tab 
     *  so things won't mixed up in two tabs */
    tabChanged( event: MatTabChangeEvent ) {

        if ( event.index == 0 ) {

            this.appointmentForm.reset();

        }
        else if
        ( event.index == 1 ) {
            this.appointmentWithoutPatientId.reset();
        }

    }

    /** patientIdExist method check if the patient id exist in database or not 
     *  it execute on change */

    patientIdExist() {

        this.doctorService.patientExist( this.patientId.value ).subscribe(( data ) => {
            if ( data.json().error ) {
                this.patientId.setErrors( { "noPatient": true } );
            }
        } );
    }


}