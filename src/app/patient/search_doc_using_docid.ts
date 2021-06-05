import { Component } from "@angular/core";
import { FormGroup, FormControl, Validator, FormBuilder } from "@angular/forms";
import { Doctor } from "../dr/doctor";
import { PatientService } from "./patient_service";
import { FormResult } from "../model/formresult";
import { DoctorPublicProfile } from "../dr/doctor_public_profile";
import { MatDialog } from "@angular/material";
import {Router} from "@angular/router";



@Component( {
    selector: "search-doc-using-docid",
    templateUrl: "./html/search_doc_using_docid.html"
} )

export class SearchDocUsingDocid {

    searchDocForm: FormGroup;

    docId: FormControl = new FormControl( "", [] );

    result: FormResult = new FormResult();

    doctor: Doctor = new Doctor();

    showDoc: boolean = false;

    constructor( private formBuilder: FormBuilder, private patientService: PatientService,
        private matDialog: MatDialog , private router:Router ) {


    }

    ngOnInit() {

        this.patientService.isSignupComplete();

        
        this.searchDocForm = this.formBuilder.group( {
            "docId": this.docId
        } );
    }


    Submit() {
        this.patientService.getDoctorUsingDocId( this.docId.value ).subscribe(( data ) => {
            // check if response body is not empty 

            if ( data.status != 204 ) {
                this.showDoc = true;
                this.doctor = data.json();
                this.result.error = false;
                console.log( this.doctor );
            }
            else {
                this.showDoc = false;
                this.result.error = true;
                this.result.message = "No Doctor Found With this Id";
            }
        } );
    }


    showDoctor( docId ) {
        this.matDialog.open( DoctorPublicProfile, {
            data: { docId: docId },
            height: '700px',
            width: '900px'

        } );
    }




}