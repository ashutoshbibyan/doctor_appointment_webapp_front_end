import { Component } from "@angular/core";
import { PatientService } from "./patient_service";
import { MatDialog } from "@angular/material";
import { DoctorInPatient } from "../model/doctorInPatient";
import { DoctorPublicProfile } from "../dr/doctor_public_profile";


@Component( {
    selector: "show-doc-added",
    templateUrl: "./html/show_doctor_added.html"
} )
export class ShowDoctorAdded {


    doctorList: DoctorInPatient[] = new Array();


    constructor( private patientService: PatientService, private matDialog: MatDialog ) {

    }

    ngOnInit() {

        this.patientService.isSignupComplete();

        this.getDoctorList();
    }

    getDoctorList() {
        this.patientService.getPatientDoctors().subscribe(( data ) => {
            if ( data != undefined ) {
                this.doctorList = data.json();
            }
        } );
    }


    deleteDoctor( doctorInPatient: DoctorInPatient ) {
        this.patientService.deleteDoctorFromPatient( doctorInPatient ).subscribe(( data ) => {
            if ( data != undefined ) {
                if ( data.json().result ) {
                    this.getDoctorList();
                }
            }
        } );
    }


    showDocProfile( docId: string ) {
        this.matDialog.open( DoctorPublicProfile, {
            data: { docId: docId },
            height: '700px',
            width: '900px'

        } );
    }

}