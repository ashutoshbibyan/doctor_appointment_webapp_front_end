import { Component, Inject } from "@angular/core";
import { User } from "./user";
import { Router,ActivatedRoute } from "@angular/router";
import { UserService } from "./user_service";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DOCUMENT} from "@angular/platform-browser";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component( {
    selector: "log-in",
    templateUrl: "./html/login.html",
    styleUrls: ["./css/login.css"]
} )

export class LogIn {

    model: User = new User();

    loginForm: FormGroup;

    error:boolean;

    mobileNo: FormControl = new FormControl( "", [

        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
       

    ] );

    password: FormControl = new FormControl( "", [
        Validators.required

    ] );

    constructor( private formBuilder: FormBuilder, private userService: UserService, private router: Router 
    ,private activatedRoute:ActivatedRoute ,@Inject(DOCUMENT) private document:any) {

    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group( {
            mobileNo:this.mobileNo,
            password: this.password
        } );


       this.activatedRoute.queryParams.subscribe((data)=>{
            this.error=data["error"];
            
       }); 
    }


    submit() {

        if(this.loginForm.status=="VALID"){

            let user: User = new User();
            user.mobileNo = this.loginForm.value.mobileNo;
            user.password = this.loginForm.value.password;
            this.userService.userLogin( user ).subscribe(( data ) => {

           
            if ( data != undefined ) {
                // this redirect method may not work in all situation 
                // replace if better method avilable in future 
                this.document.location.href=data.url;
            }

        } );

        

    }

}

}