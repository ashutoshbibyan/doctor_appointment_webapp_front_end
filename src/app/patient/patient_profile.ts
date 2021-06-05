import { Component } from "@angular/core";
import { PatientService } from "./patient_service";
import { Patient } from "./patient";



@Component( {
    selector: "patient-profile",
    templateUrl: "./html/patient_profile.html"
} )

export class PatientProfile {

    patient: Patient = new Patient();



    constructor( private patientService: PatientService ) {

    }

    ngOnInit() {


        this.patientService.getPatient().subscribe(( data ) => {
            if ( data != undefined ) {
                this.patient = data.json();
            }
        } );

        console.log( this.patient.dateOfBirth.toDateString() );

    }

}
