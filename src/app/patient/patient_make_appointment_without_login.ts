import {Component,Inject} from "@angular/core";

import {MAT_DIALOG_DATA} from "@angular/material"

import {DoctorService} from "../dr/doctor_service";

import {Doctor} from "../dr/doctor";

import {Hours} from "../model/hours";

import {Day} from "../model/day";
import { FormGroup , FormBuilder, FormControl } from "@angular/forms";
import {MatDatepickerInputEvent,MatSnackBar} from "@angular/material";

import {PatientService} from "./patient_service";
import {CommonService} from "../common/common_service";



@Component({
    selector:"patient-make-free-appointment",
    templateUrl:"./html/patient_make_appointment_without_login.html"
})
export class PatientMakeAppointmentWithoutLogin{

    chooseDateTimeForm:FormGroup;

    mobileNoForm:FormGroup;

    mobileNo:FormControl= new FormControl("",[]);

    appointmentDate:FormControl = new FormControl("",[]);

    appointmentTime:FormControl= new FormControl("",[]);

    docId:string="lalitdoctor@gmail.com";

    hours: Hours[] = new Array();

    workingDays: Day[] = new Array();

    holidays: Date[] = new Array();

    currentDate: Date = new Date();

    appointmentLeft: number;



    doctor:Doctor;

    holidayFilter = ( selectedDate: Date ): boolean => {

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

    

    constructor(/**@Inject( MAT_DIALOG_DATA ) public data: any ,*/ 
    private doctorService:DoctorService,private formBuilder:FormBuilder , private matSnackBar:MatSnackBar,
private patientService:PatientService, private commonService:CommonService){

    }

    ngOnInit(){
     
        // this.docId=this.data.docId;

        this.doctorService.getDocUsingId(this.docId).subscribe((data)=>{
            if(data!=undefined){
                this.doctor=data.json();

                this.workingDays=this.doctor.workingDays;
                this.holidays=this.doctor.holidays;
            }
        });


       this.chooseDateTimeForm= this.formBuilder.group({

            "appointmentDate":this.appointmentDate,
            "appointmentTime":this.appointmentTime

        });

        this.mobileNoForm=this.formBuilder.group({
            "mobileNo":this.mobileNo
        });

        


        
    }

     /** dateSelected method execute when user select the date and change the time slots available at that day*/

     dateSelected( event: MatDatepickerInputEvent<Date> ) {


        for ( let i = 0; i < this.workingDays.length; i++ ) {
            if ( this.workingDays[i].dayId == event.value.getDay() ) {

                this.hours =  this.workingDays[i].hours;
                
            }
        }

    }


    getAppointmentLeft() {
        this.patientService.getAppointmentBooked( this.doctor.docId,
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

    showMobile(){
        console.log(this.mobileNo.value);
    }


    
}