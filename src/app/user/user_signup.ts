import { Component } from "@angular/core";
import { Error } from "../error";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import { User } from "./user";
import { UserService } from "./user_service";
import {MatSnackBar} from "@angular/material";
import {FormResult} from "../model/formresult";



@Component( {
    selector: "user-signup",
    templateUrl: "./html/user_signup.html"
} )
export class UserSignup {


    model: any = new Object();
    error: Error = new Error();

   
    userSignupForm: FormGroup;

    mobileNo:FormControl = new FormControl( "", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
    ] );

    role: FormControl = new FormControl( "", [
        Validators.required
    ] );


    password: FormControl = new FormControl( "", [
        Validators.required
    ] );


    constructor( private formBuilder: FormBuilder, private userService: UserService ,
    private matSnackBar:MatSnackBar , private router:Router) {

    }

    ngOnInit() {
        this.userSignupForm = this.formBuilder.group( {
            mobileNo: this.mobileNo,
            role: this.role,
            password: this.password
        } );

        
    }


    submit() {

    console.log(this.userSignupForm);
       if(this.userSignupForm.status=="VALID"){

        let user: User = new User();
        user.mobileNo = this.userSignupForm.value.mobileNo;
        user.password = this.userSignupForm.value.password;
        
        user.role = this.userSignupForm.value.role;

        console.log(user);
        
        this.userService.userSignup( user ).subscribe(( data ) => {
            let formResult:FormResult=data.json();
            console.log(formResult);
            if(formResult.result){
                // this.router.navigateByUrl("user/phone/varification?mobileNo="+user.mobileNo);
                this.matSnackBar.open(formResult.message,"Done",{
                    duration:3000
                });
            }

            else if(formResult.error){
                this.matSnackBar.open(formResult.message,"Error",{
                    duration:3000
                });
            }
            
        } );


       }

        
    }

}