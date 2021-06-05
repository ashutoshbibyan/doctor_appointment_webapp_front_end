import { Component } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TimeSlot } from "../model/timeslot";
import { Doctor } from "./doctor";
import { FormResult } from "../model/formresult";
import { DoctorService } from "./doctor_service";
import {Router} from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component( {
    selector: "doc-appoint-setup",
    templateUrl: "./html/doctor_appointment_setup.html"
} )

export class DoctorAppointmentSetup {

    appointmentForm: FormGroup;

    doctor: Doctor = new Doctor();
    result: FormResult = new FormResult();


    feeAmount: FormControl = new FormControl( '', [] );
    maxAppointments: FormControl = new FormControl( '', [] );



    constructor( private formBuilder: FormBuilder, private doctorService: DoctorService,
        private matSnackBar: MatSnackBar , private router:Router ) {

    }

    ngOnInit() {

        this.getDoctor();

        this.appointmentForm = this.formBuilder.group( {
            feeAmount: this.feeAmount

        } );
    }

    getDoctor() {
        this.doctorService.getDoctorPublicInfo().subscribe(( data ) => {
            if ( data != undefined ) {

                if(data["_body"]!=""){

                    this.doctor = data.json();
                    this.feeAmount.setValue( this.doctor.appointmentFee );

                }

                else{
                    this.router.navigateByUrl("/dr/home/dr/signup");
                }
               

            }
        } );
    }


    submit() {

        let doctor: Doctor = new Doctor();
        doctor.appointmentFee = this.appointmentForm.value.feeAmount;

        this.doctorService.docAppointmentSetup( doctor ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.result = data.json();
                if ( this.result.result ) {
                    this.matSnackBar.open( this.result.message, "Saved", {
                        duration: 3000
                    } );
                }
                else if ( this.result.error ) {
                    this.matSnackBar.open( this.result.message, "Error", {
                        duration: 3000
                    } );
                }

            }
        } );

    }



}