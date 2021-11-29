import { Component } from "@angular/core";
import {UserService} from "../user/user_service";
import {Router} from "@angular/router";
import {DoctorService} from "./doctor_service";


@Component( {
    selector: 'doctor-home',
    templateUrl: "./html/doctor_home.html",

    styleUrls: ["./css/doctor_home.css"]
} )


export class DoctorHome {

    

    constructor(private userService:UserService , private router:Router ,
    private doctorService:DoctorService) {

    }

    ngOnInit(){

        /**
       
        this.doctorService.getDoctorPublicInfo().subscribe((data)=>{
           
                if(data["_body"]==""){
                   this.router.navigateByUrl("/dr/home/dr/signup");
                }
               
        });

        */
    }

  



    signOut(){

        /**
        
        this.userService.userLogout().subscribe((data)=>{
            if(data!=undefined){
                if(data.status==200){
                    this.router.navigateByUrl("/");
                }
                
            }
        });

        */
       this.router.navigateByUrl("/");

    }

}