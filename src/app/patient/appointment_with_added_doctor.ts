import { Component } from "@angular/core";
import {Router} from "@angular/router";
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { Patient } from "./patient";
import { TimeSlot } from "../model/timeslot";
import { Doctor } from "../dr/doctor";
import { Day } from "../model/day";
import { CommonService } from "../common/common_service";
import { Hours } from "../model/hours";
import { MatDatepickerInputEvent, MatSnackBar } from "@angular/material";
import { PatientService } from "./patient_service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component( {
    selector: "appointment-with-added-doctor",
    templateUrl: "./html/appointment_with_added_doctor.html"
} )
export class AppointmentWithAddedDoctor {


    patient: Patient = new Patient();

    // form group for the make an appointment form 
    appointmentForm: FormGroup;

    showAppointmentForm: boolean = false;

    currentDate: Date = new Date();

    hours: Hours[] = new Array();

    workingDays: Day[] = new Array();

    doctors: Doctor[] = new Array();

    doctorsSugest: Observable<Doctor[]>;

    timeSlots: TimeSlot[] = new Array();


    holidays: Date[] = new Array();

    // doctor form control field  
    selectedDoc: FormControl = new FormControl( '', [

        Validators.required
    ] );

    // time slot for the appointment 
    appointmentTime: FormControl = new FormControl( '', [
        Validators.required
    ] );

    //appointment date form control 
    appointmentDate: FormControl = new FormControl( '', [

        Validators.required
    ] );

    /* this is the filter on date picker it filter all the hollidays */

    holidayFilter;

    constructor( private formBuilder: FormBuilder, private patientService: PatientService,
        private commonService: CommonService, private matSnackBar: MatSnackBar , 
      private router:Router ) {

    }

    /* this function execute when user select a dr from the list and then 
     * it populate the list of time slots for that perticular dr in the 
     * timeSlots variable */
    drSelected() {

        let doc: Doctor = this.appointmentForm.value.selectedDoc;
        console.log( "doctor value" + doc.docId );
        // Now we get the full details of doctor
        this.patientService.getDoctorUsingDocId( doc.docId ).subscribe(( data ) => {
            if ( data != undefined ) {
                doc = data.json();
                this.holidays = doc.holidays;
                this.workingDays = doc.workingDays;



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
                    else {
                        result = true;
                    }

                    if ( this.holidays ) {

                        for ( let i = 0; i < this.holidays.length; i++ ) {


                            let holiday: Date = this.holidays[i];

                            if ( selectedDate.getTime() == parseInt( holiday.toString() ) * 1000 ) {
                                console.log( holiday );
                                console.log( selectedDate );
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


    ngOnInit() {

        this.patientService.getPatient().subscribe((data)=>{
            if(data!=undefined){
                if(data["_body"]!=""){

                    this.patient.name = data.json().name;
                }

                else{
                    this.router.navigateByUrl("/patient/home/patient/signup");
                }
            }
        });
        


        if ( window.navigator.geolocation ) {
            window.navigator.geolocation.getCurrentPosition( position => {
                console.log( position );
            } );
        }

        this.getDocForPatient();



        this.appointmentForm = this.formBuilder.group( {

            selectedDoc: this.selectedDoc,
            appointmentTime: this.appointmentTime,
            appointmentDate: this.appointmentDate

        } );



    }




    submit() {
        console.log( this.appointmentForm.value );
    }

    getDocForPatient() {
        this.patientService.getPatientDoctors().subscribe(( data ) => {
            if ( data != undefined ) {
                this.doctors = data.json();
            }
        } );
    }

    docHover( dr ) {
        console.log( dr );
    }



    getDocDetail( i: number ) {
        let doc: Doctor = this.doctors[i];

        return doc.addrLineOne;

    }



    getAppointmentLeft() {
        this.patientService.getAppointmentBooked( this.selectedDoc.value.docId,
            this.appointmentDate.value, this.appointmentTime.value )
            .subscribe(( data ) => {
                if ( data != undefined ) {

                    let appointment = data.json();
                    console.log( data );
                    let appointmentLeft = this.appointmentTime.value.maxPatientNo - appointment;



                    if ( appointmentLeft > 0 ) {
                        this.matSnackBar.open( "Appointment Left " + appointmentLeft, "Hurry", {
                            duration: 3000
                        } );
                    }

                    else {
                        this.matSnackBar.open( "Appointment Full Choose Another Time", "Sorry", {
                            duration: 3000
                        } );
                    }

                }
            } );
    }



}