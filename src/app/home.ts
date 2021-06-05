import { Component } from "@angular/core";
import {UserService} from "./user/user_service";
import {User} from "./user/user";
import {Router} from "@angular/router";
import {DoctorService} from "./dr/doctor_service";
import {Speciality} from "./model/speciality";

import{Http} from "@angular/http";

@Component( {
    selector: "home",
    templateUrl: "./home.html"
} )

export class Home {


    constructor(private userService:UserService , private router:Router ,
        private doctorService:DoctorService,private http:Http){

    }

    



    ngOnInit(){

        

        

        this.userService.getCurrentUser().subscribe((data)=>{

       
            if(data["_body"]!=""){

                let currentUser:User=data.json();

                if(currentUser.role=="ROLE_DOCTOR"){
                    
                    this.router.navigateByUrl("/dr/home");
    
                }
                else if(currentUser.role=="ROLE_PATIENT"){
                    this.router.navigateByUrl("/patient/home");
                }
    

            }

        });
    

    }

}