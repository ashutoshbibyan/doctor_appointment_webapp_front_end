import { Component } from "@angular/core";
import { Doctor } from "./doctor";
import { CommonService } from "../common/common_service";
import { DoctorService } from "./doctor_service";
import { City } from "../model/city";
import { Degree } from "../model/degree";
import { Speciality } from "../model/speciality";
import { State } from "../model/state";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { DoctorAddWorkingHours } from "./doctor_add_working_hours";
import { FormResult } from "../model/formresult";
import { UserChooseProfileImage } from "../common/user_choose_profile_image";
import { Router } from "@angular/router";



@Component( {
    selector: "doctor-profile-edit",
    templateUrl: "./html/doctor_profile_edit.html",
    styleUrls: ["./css/doctor_profile_edit.css"]
} )

export class DoctorProfileEdit {

    progress: boolean = true;
    appointment: boolean = true;
    appointmentEdit: boolean = false;
    phoneNo: boolean = true;
    phoneNoEdit: boolean = false;
    address: boolean = true;
    addressEdit: boolean = false;
    name: boolean = true;
    nameEdit: boolean = false;
    about: boolean = true;
    aboutEdit: boolean = false;
    qualification: boolean = true;
    qualificationEdit: boolean = false;
    speciality: boolean = true;
    specialityEdit: boolean = false;

    // List of states for the select field
    states: State[];

    // list of cities for the select field 
    cities: City[];


    //list of qualification 
    qualificationOptions: Degree[];

    // list of specialities
    specialities: Speciality[];

    docId: string;


    // form fields 

    // address string;

    address2: string;

    state: string;

    city: string;

    doctor: Doctor = new Doctor();



    constructor( private doctorService: DoctorService, private matSnackBar: MatSnackBar
        , private commonService: CommonService, private dialog: MatDialog ,
    private router:Router) {

    }

    ngOnInit() {

        this.getState();

        this.getDoctor();

        this.getAllDegree();

        this.getAllSpeciality();



        // after upload dailog closed we get new doctor object

        this.dialog.afterAllClosed.subscribe(() => {
            this.getDoctor();
        } );
    }

    getDoctor() {

        this.doctorService.getDoctorPublicInfo().subscribe(( data ) => {
            if ( data.status != 204 ) {

                if(data["_body"]!=""){
                    
                    this.doctor = data.json();

                    // hide the progres bar 
                    this.progress = false;
                }

                else{
                    this.router.navigateByUrl("/dr/home/dr/signup");
                }


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
        let stateId: string = this.doctor.state;
        this.getCitites( stateId );
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


    openDialog() {
        let dialogRef = this.dialog.open( DoctorAddWorkingHours, {
            width: "1000px",
            height: "700px"
        } );
    }


    save() {
        this.progress = true;
        this.doctorService.saveDoctorObject( this.doctor ).subscribe(( data ) => {
            if ( data != undefined ) {

                let formResult: FormResult = data.json();
                if ( formResult.result ) {
                    this.progress = false;
                    this.matSnackBar.open( formResult.message, "Saved", {
                        duration: 3000
                    } );
                }

                else {
                    this.progress = false;
                    this.matSnackBar.open( formResult.message, "Error", {
                        duration: 3000
                    } );
                }
            }
        } );
    }


    refresh(): void {

        this.getDoctor();

    }


    upload() {

        this.dialog.open( UserChooseProfileImage, {
            width: "700px",
            height: "600px"

        } );


    }





}