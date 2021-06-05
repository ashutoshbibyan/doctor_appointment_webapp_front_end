import { Component } from "@angular/core";
import { DoctorService } from "./doctor_service";
import { Appointment } from "../model/appointment";
import { PageEvent, MatDialog, MatDialogRef } from "@angular/material";
import { CommonService } from "../common/common_service";
import { DoctorWritePrescription } from "./doctor_write_prescription";
import { Router } from "@angular/router";



@Component( {
    selector: "doc-panel",
    templateUrl: "./html/doctor_panel.html",
    styleUrls: ["./css/doctor_panel.css"]
} )

export class DoctorPanel {


    appointments: Appointment[];

    progress: boolean = true;

    pageNo: number;

    pageSize: number = 10;

    totalElements: number;

    showAppointment: boolean = false;


    constructor( private doctorService: DoctorService, private commonService: CommonService,
        private matDialog: MatDialog , private router:Router) {

    }


    ngOnInit() {

        this.getAppointments( 0 );


        this.matDialog.afterAllClosed.subscribe(() => {
            this.getAppointments( 0 );
        } );

        this.doctorService.getDoctorPublicInfo().subscribe((data)=>{
            if(data!=undefined){
                if(data["_body"]==""){
                    this.router.navigateByUrl("/dr/home/dr/signup");
                }
            }
        });
    }




    writePrescription( appointmentId: string ) {
        this.matDialog.open( DoctorWritePrescription, {

            data: { appointmentId: appointmentId },
            height: '700px',
            width: '900px'

        } );
    }


    getAppointments( page: number ) {
        this.progress = true;
        this.pageNo = page;

        this.doctorService.getTodayAppointment( this.pageNo, this.pageSize ).subscribe(( data ) => {

            if ( data != undefined ) {
                console.log( data.json().content );
                this.appointments = data.json().content;
                this.totalElements = data.json().totalElements;
                console.log( this.appointments );
                if ( this.appointments.length != 0 ) {
                    this.showAppointment = true;
                    this.progress = false;
                }
                else {
                    this.progress = false;
                }



            }
        } );
    }

    nextPage( event: PageEvent ) {

        this.getAppointments( event.pageIndex );

    }


}