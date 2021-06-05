import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Doctor } from "./doctor";
import { State } from "../model/state";
import { City } from "../model/city";
import { Degree } from "../model/degree";
import { DoctorService } from "./doctor_service";
import { Speciality } from "../model/speciality";
import { FormResult } from "../model/formresult";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";



@Component( {
    selector: "doc-signup",
    templateUrl: "./html/doctor_signup.html",
    styleUrls: ["./css/doctor_signup.css"]
} )
export class DoctorSignup {

    /* list of form group */
    qualificationForm: FormGroup;
    personalForm: FormGroup;
    contactForm: FormGroup;


    result: FormResult = new FormResult();

    // doctor objcet to be forward to save 
    doctor: Doctor = new Doctor();



    // List of states for the select field
    states: State[];

    // list of cities for the select field 
    cities: City[];




    //list of qualification 
    qualificationOptions: Degree[];

    // list of specialities
    specialities: Speciality[];

    /* initialization of form controls start here */

    name: FormControl = new FormControl( "", [

        Validators.required

    ] );

    about: FormControl = new FormControl( "", [
        Validators.required,
        Validators.maxLength( 256 )

    ] );


    qualifications: FormControl = new FormControl( "", [

        Validators.required

    ] );

    specialitiesControl: FormControl = new FormControl( "", [

    ] );

    address: FormControl = new FormControl( "", [
        Validators.required

    ] );

    address2: FormControl = new FormControl( "" );

    state: FormControl = new FormControl( "", [

        Validators.required

    ] );
    city: FormControl = new FormControl( "", [
        Validators.required
    ] );
    phoneno: FormControl = new FormControl( "", [
        Validators.required,
        Validators.minLength( 10 )
    ] );

    /* initialization of form control ends here */


    constructor( private _formBuilder: FormBuilder, private doctorService: DoctorService ,
    private matSnackBar:MatSnackBar , private router:Router) { }



    ngOnInit() {

        this.getState();

        this.getAllDegree();

        this.getAllSpeciality();

        this.personalForm = this._formBuilder.group( {
            name: this.name,
            about: this.about
        } );

        this.qualificationForm = this._formBuilder.group( {

            qualifications: this.qualifications,
            specialities: this.specialitiesControl
        } );

        this.contactForm = this._formBuilder.group( {
            address: this.address,
            address2: this.address2,
            state: this.state,
            city: this.city,
            phoneno: this.phoneno
        } );

    }

    /* getAddDegree get list of the degress from the database and populate it into 
     * the form select field */
    getAllDegree() {
        this.doctorService.getAllDegree().subscribe(( data ) => {
            if ( data != undefined ) {
                this.qualificationOptions = data.json();
            }
        } );
    }


    /*getAllSpeciality get list of all the speciality form the database and populate into
     * the form select field */

    getAllSpeciality() {
        this.doctorService.getAllSpeciality().subscribe(( data ) => {
            if ( data != undefined ) {
                this.specialities = data.json();
            }
        } );
    }

    /*getState method get all the state from the database and populate it into the 
     *form select field */

    getState() {
        this.doctorService.getAllState().subscribe(( data ) => {
            if ( data != undefined ) {
                this.states = data.json();
            }
        } );
    }


    /* getCitites method get all the cityies for a particular state selected by the user it 
     * takes one parameter which is stateid */
    getCitites( stateId: string ) {
        this.doctorService.getAllCities( stateId ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.cities = data.json();
            }
        } );
    }


    /*     it execute when user select a state from the state list and change the list 
     *     of cities to all the cities for that perticular state */
    stateSelected() {
        let stateId: string = this.contactForm.value.state;
        this.getCitites( stateId );
    }



    /* execute when user submit the form by clicking the save button in the last 
     * step of the form */
    submit() {
        // put all the value in the doctor object 
        this.doctor.name = this.personalForm.value.name;
        this.doctor.about = this.personalForm.value.about;
        this.doctor.degrees = this.qualificationForm.value.qualifications;
        this.doctor.specialities = this.qualificationForm.value.specialities;
        this.doctor.addrLineOne = this.contactForm.value.address;
        this.doctor.addrLineTwo = this.contactForm.value.address2;
        this.doctor.state = this.contactForm.value.state;
        this.doctor.city = this.contactForm.value.city;
        this.doctor.phoneno = this.contactForm.value.phoneno;

        console.log(this.doctor);
        this.doctorService.saveDoctor( this.doctor ).subscribe(( data ) => {
            console.log(data);
            if ( data != undefined ) {
                this.result = data.json();
                if(this.result.result){
                    this.matSnackBar.open("SignUp Completed","Done",{
                        duration:3000
                    });
                    this.router.navigateByUrl("/dr/home");
                    
                }
                else if(this.result.error){
                    this.matSnackBar.open(this.result.message,"Error",{
                        duration:3000
                    });
                }
            }
        } );

    }

}