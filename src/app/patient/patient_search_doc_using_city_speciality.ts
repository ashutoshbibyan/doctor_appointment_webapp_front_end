
import {Component,HostListener} from "@angular/core";
import {DoctorService} from "../dr/doctor_service";
import {Speciality} from "../model/speciality";
import {FormGroup,FormControl,FormBuilder} from "@angular/forms";
import {PatientService} from "./patient_service";
import { Doctor } from "app/dr/doctor";
import { MatDialog, MatSnackBar } from "@angular/material";
import { DoctorPublicProfile } from "../dr/doctor_public_profile";
import { Router } from "@angular/router";
import { PatientMakeAppointmentWithoutLogin} from "./patient_make_appointment_without_login";


@Component({
    selector:"search-using-city-speciality",
    templateUrl:"./html/search_using_city_speciality.html",
     styleUrls: ["./css/search_doc_using_city_speciality.css"]
})
export class SearchDocUsingCityAndSpeciality{

    specialities:Speciality[];

    searchDocUsingCitySpeciality:FormGroup;

    city:FormControl = new FormControl("",[]);

    speciality:FormControl= new FormControl("",[]);

    pageNo: number;

    totalPages: number;

    showDoc: boolean = false;

    pageSize: number = 2;

    doctorList: Doctor[] = new Array();




    constructor(private doctorService:DoctorService,private formBuilder:FormBuilder,
    private patientService:PatientService,private matDialog:MatDialog,private router:Router){

        
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

    ngOnInit(){

        
       

        this.patientService.getPatientPostion();
        
        this.searchDocUsingCitySpeciality=this.formBuilder.group({
            "city":this.city,
            "speciality":this.speciality
        });
        
        this.getAllSpeciality();


    }


    submit(){

        console.log("test");
        console.log(this.searchDocUsingCitySpeciality);
        this.pageNo = 0;
        this.patientService.searchDocUsingCityAndSpeciality
        (this.city.value,this.speciality.value,this.pageNo,this.pageSize ).subscribe(( data ) => {
               if ( data != undefined ) {
                   console.log(data);
                   this.showDoc = true;
                   this.totalPages = data.json().totalPages;
                   this.doctorList = data.json().content;
               }
           } );
    }


      /** this method is binded with the scroll event of the document and it get executed when user 
     * reached at the end of the page and it add more doctor into the list */

    @HostListener( "window:scroll", [] )
    onScroll(): void {
        if ( ( window.innerHeight + window.scrollY ) >= document.body.offsetHeight ) {
            // you're at the bottom of the page
            if ( this.pageNo < this.totalPages ) {


                this.pageNo = this.pageNo + 1;
                this.patientService.searchDocUsingCityAndSpeciality(this.city.value,this.speciality.value,
                     this.pageNo, this.pageSize ).subscribe(( data ) => {
                        if ( data != undefined ) {
                            // adds the new array to the previous doctor list 
                            this.doctorList.push.apply( this.doctorList, data.json().content );

                        }

                    } );
            }
        }


    }

    showDoctor( docId ) {
        this.matDialog.open( DoctorPublicProfile, {
            data: { docId: docId },
            height: '700px',
            width: '900px'

        } );
    }


    makeAppointment( docId ) {
        // let url = "/patient/home/make/appointment/" + docId;
        // this.router.navigateByUrl( url );

        this.matDialog.open(PatientMakeAppointmentWithoutLogin,{
            data:{docId:docId},
            height:"700px",
            width:"900px"
        });
    }



}
