import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "./doctor_service";
import { Doctor } from "./doctor";
import { MAT_DIALOG_DATA } from "@angular/material";
import { CommonService } from "../common/common_service";

@Component( {
    selector: "doc-public-profile",
    templateUrl: "./html/doctor_public_profile.html",
    styleUrls: ["./css/doctor_public_profile.css"]
} )

export class DoctorPublicProfile {

    docId: string;

    doctor: Doctor = new Doctor();

    constructor( private acroute: ActivatedRoute, private doctorService: DoctorService
        , private commonService: CommonService, @Inject( MAT_DIALOG_DATA ) public data: any,
        private router: Router ) {

    }

    ngOnInit() {

        this.docId = this.data.docId;

        this.getDoctor();

    }

    getDoctor() {

        this.doctorService.getDocUsingId( this.docId ).subscribe(( data ) => {
            if ( data.status != 204 ) {
                this.doctor = data.json();
                this.doctor.workingDays = this.doctor.workingDays;

            }
        } );

    }




}