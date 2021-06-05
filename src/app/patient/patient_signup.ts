import { Component } from "@angular/core";
import { PatientService } from "./patient_service";
import { Patient } from "./patient";
import { Disease } from "../model/disease";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormResult } from "../model/formresult";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

const REG_DATE = new RegExp( " /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/" );

@Component( {
    selector: "patient-signup",
    templateUrl: "./html/patient_signup.html",
    styleUrls: ["./css/patient_signup.css"]
} )
export class PatientSignup {

    patientSignupForm: FormGroup;

    addressForm: FormGroup;

    // used in the date picker to avoid user to choose future date as date of birth
    currentDate: Date = new Date();
    // used in the date picker to stop using date before 1900 
    oldestDate: Date = new Date( 1900, 1, 1 );

    result: FormResult = new FormResult();

    // list of the medical conditions 
    medConditions: Disease[] = new Array();

    patient: Patient = new Patient();



    dateOfBirth: FormControl = new FormControl( '', [
        Validators.required

    ] );

    name: FormControl = new FormControl( '', [
        Validators.required
    ] );



    medcondition: FormControl = new FormControl( '', [

    ] );

    addressLineOne: FormControl = new FormControl( "", [] );

    addressLineTwo: FormControl = new FormControl( "", [] );

    state: FormControl = new FormControl( "", [] );

    city: FormControl = new FormControl( "", [] );


    constructor( private formBuilder: FormBuilder, private patientService: PatientService, private router: Router 
    ,private matSnackBar:MatSnackBar) {

    }




    ngOnInit() {

        // get the list of the medical condition from the database 
        this.getListOfMedCondition();

        // initialize the form group 
        this.patientSignupForm = this.formBuilder.group( {

            'name': this.name,

            'dateOfBirth': this.dateOfBirth,
            'medcondition': this.medcondition,
            'addressLineOne': this.addressLineOne,
            'addressLineTwo': this.addressLineTwo,
            'state': this.state,
            'city': this.city
        } );



    }

    // this method get the list of all the medical condition 
    getListOfMedCondition() {
        this.patientService.getDiseaseList().subscribe(( data ) => {
            if ( data != undefined ) {
                this.medConditions = data.json();
                console.log( this.medConditions );

            }
        } );
    }

    /* execute when user submit the form */
    submit() {


        console.log( this.patient );
        this.patientService.patientSignup( this.patient ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.result = data.json();
                if ( this.result.result ) {
                    this.matSnackBar.open("SignUp is Completed","Done",{
                        duration:3000
                    });
                    this.router.navigateByUrl( "/patient/home" );
                }
                else if(this.result.error){
                    this.matSnackBar.open(this.result.message,"Error",{
                        duration:3000
                    });

                }
            }
        } );

    }


    addressSubmited( event ) {

        this.addressForm = event;


        this.patient.name = this.patientSignupForm.value.name;

        this.patient.dateOfBirth = this.patientSignupForm.value.dateOfBirth;

        this.patient.address.addressLineOne = this.addressForm.value.addressLineOne;

        this.patient.address.addressLineTwo = this.addressForm.value.addressLineTwo;

        this.patient.address.state = this.addressForm.value.state;

        this.patient.address.city = this.addressForm.value.city;

        this.patient.address.phoneNo = this.addressForm.value.phoneNo;



        this.patient.diseases = this.patientSignupForm.value.medcondition;
        if ( this.patient.diseases.length == 0 ) {
            this.patient.diseases = null;
        }

    }



}