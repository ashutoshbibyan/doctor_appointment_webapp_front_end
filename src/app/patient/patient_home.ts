import { Component } from "@angular/core";
import { Patient } from "./patient";
import { Doctor } from "../dr/doctor";
import { TimeSlot } from "../model/timeslot";
import { holidayValidator } from "./holidayValidator";
import {UserService} from "../user/user_service";
import {Router} from  "@angular/router";

import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn } from "@angular/forms";

@Component( {
    selector: "patient-home",
    templateUrl: "./html/patient_home.html",
    styleUrls: ["./css/patient_home.css"]
} )

export class PatientHome {

    constructor(private userService:UserService , private router:Router){

    }


    logOut(){

        this.userService.userLogout().subscribe((data)=>{
            if(data!=undefined){
                if(data.status==200){
                    this.router.navigateByUrl("/");
                }
                
            }
        });

    }


}