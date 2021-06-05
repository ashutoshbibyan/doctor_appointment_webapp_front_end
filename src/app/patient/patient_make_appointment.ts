import { Component, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { Patient } from "./patient";
import { TimeSlot } from "../model/timeslot";
import { Doctor } from "../dr/doctor";
import { Day } from "../model/day";
import { CommonService } from "../common/common_service";
import { Hours } from "../model/hours";
import { MatDatepickerInputEvent, MatSelect, MatSelectTrigger, MatSnackBar } from "@angular/material";
import { PatientService } from "./patient_service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";

import { DoctorService } from "../dr/doctor_service";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
import { LocalTime, DateTimeFormatter } from "js-joda/dist/js-joda";


@Component( {
    selector: "patient-make-appointment",
    templateUrl: "./html/patient_make_appointment.html"
    
} )
export class PatientMakeAppointment {


    @ViewChild( "docSelect" ) docSelect: MatSelect;

    private readonly RELOAD_TOP_SCROLL_POSITION = 6;

    appointmentLeft: number;

    pageNo: number = 0;

    totalPages: number;

    pageSize: number = 10;

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

    constructor( private formBuilder: FormBuilder, private patientService: PatientService, private commonService: CommonService
        , private doctorService: DoctorService, private matSnackBar: MatSnackBar 
    ,private router:Router) {

    }

    /* this function execute when user select a dr from the list and then 
     * it populate the list of time slots for that perticular dr in the 
     * timeSlots variable */
    drSelected() {

        let doc: Doctor = this.appointmentForm.value.selectedDoc;

        this.holidays = doc.holidays;
        this.workingDays = doc.workingDays;

        console.log( doc );

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
                        console.log( holiday );
                        console.log( selectedDate );
                        result = false;

                    }
                }


            }

            return result;
        };
        console.log( this.holidays );
    }

    /** dateSelected method execute when user select the date and change the time slots available at that day*/

    dateSelected( event: MatDatepickerInputEvent<Date> ) {


        for ( let i = 0; i < this.workingDays.length; i++ ) {
            if ( this.workingDays[i].dayId == event.value.getDay() ) {

                this.hours =  this.workingDays[i].hours;
            }
        }

    }


    ngOnInit() {
        

        this.patientService.getPatient().subscribe((data)=>{
            if(data!=undefined){
                if(data["_body"]==""){
                    this.router.navigateByUrl("/patient/home/patient/signup");
                }
                else{
                    this.patient.name=data.json().name;
                }
            }
        });


        if ( window.navigator.geolocation ) {
            window.navigator.geolocation.getCurrentPosition( position => {
                console.log( position );
            } );
        }

        this.getDocForPatient( this.pageNo, this.pageSize );



        this.appointmentForm = this.formBuilder.group( {

            selectedDoc: this.selectedDoc,
            appointmentTime: this.appointmentTime,
            appointmentDate: this.appointmentDate

        } );


        this.docSelect.onOpen.subscribe(() => this.registerPanelScrollEvent() );


    }




    submit() {
        console.log( this.appointmentForm.value );
    }

    getDocForPatient( pageNo: number, pageSize: number ) {
        this.patientService.getDocForPatient( pageNo, pageSize ).subscribe(( data ) => {
            if ( data != undefined ) {

                this.doctors = this.doctors.concat( data.json().content );
                this.totalPages = data.json().totalPages;
                console.log( data.json().content );
                console.log( this.doctors );
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
                    console.log(data);
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


    getNewDoc() {

        console.log( this.docSelect );

    }

    registerPanelScrollEvent() {

        const panel = this.docSelect.panel.nativeElement;
        panel.addEventListener( 'scroll', event => this.loadAllOnScroll( event ) );
    }

    loadAllOnScroll( event ) {

        if ( event.target.scrollTop > this.RELOAD_TOP_SCROLL_POSITION ) {

            if ( this.pageNo < this.totalPages ) {
                this.pageNo = this.pageNo + 1;
                this.getDocForPatient( this.pageNo, this.pageSize );
            }

        }


    }


  /**  pay(){
       
            var options = {
                "key": "rzp_test_NsNIDbh9MpTQTF",
                "amount": "2000", // 2000 paise = INR 20
                "name": "Edr",
                "description": "Purchase Description",
                "image": "/your_logo.png",
                "handler": function (response){
                    console.log("test1");
                    this.paymentSucessfull(response);
                    console.log("test");
                },
                "prefill": {
                    "name": this.patient.name,
                    "contact": "9996200223"
                },
                "notes": {
                    "address": "Hello World"
                },
                "theme": {
                    "color": "#F37254"
                }
            };
        var rzp1 = new Razorpay (options);


            rzp1.open();
        

    }

*/

    paymentSucessfull(response:any){

        console.log(response);
    }


}