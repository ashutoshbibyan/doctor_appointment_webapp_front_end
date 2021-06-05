import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { DoctorService } from "./doctor_service";
import { Appointment } from "../model/appointment";
import { Prescription } from "../model/prescription";
import { FormResult } from "../model/formresult";
import { FormBuilder, FormGroup, FormControl, Validator } from "@angular/forms";


@Component( {
    selector: "doc-write-prescription",
    templateUrl: "./html/doctor_write_prescription.html"
} )
export class DoctorWritePrescription {

    appointmentId: string;

    appointment: Appointment = new Appointment();

    symptoms: FormControl = new FormControl( "", [] );

    prescription: FormControl = new FormControl( "", [] );

    prescriptionForm: FormGroup;


    constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private doctorService: DoctorService,
        private formBuilder: FormBuilder, private matSnackBar: MatSnackBar ) {


    }


    ngOnInit() {
        this.appointmentId = this.data.appointmentId;
        this.getAppointment( this.appointmentId );



        this.prescriptionForm = this.formBuilder.group( {
            "symptoms": this.symptoms,
            "prescription": this.prescription
        } );

    }

    setValue() {
        this.symptoms.setValue( this.appointment.prescription.symptoms );
        this.prescription.setValue( this.appointment.prescription.prescription );
    }

    getAppointment( appointmentId: string ) {

        this.doctorService.getAppointment( appointmentId ).subscribe(( data ) => {

            if ( data != undefined ) {
                this.appointment = data.json();
                this.setValue();
            }

        } );

    }



    save() {

        let prescription: Prescription = new Prescription();

        prescription.symptoms = this.prescriptionForm.value.symptoms;
        prescription.prescription = this.prescriptionForm.value.prescription;

        this.appointment.prescription = prescription;

        console.log( this.appointment );

        this.doctorService.savePrescription( this.appointment ).subscribe(( data ) => {
            if ( data != undefined ) {
                let formResult: FormResult = data.json();

                if ( formResult.result ) {
                    this.matSnackBar.open( formResult.message, "Saved", {
                        duration: 3000
                    } );
                }

                else if ( formResult.error ) {
                    this.matSnackBar.open( formResult.message, "Error", {
                        duration: 3000
                    } );
                }
            }
        } );


    }

}