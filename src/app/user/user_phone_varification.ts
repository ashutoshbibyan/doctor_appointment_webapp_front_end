import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { FormGroup, FormControl ,FormBuilder,Validator } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "app/user/user_service";
import { FormResult } from "app/model/formresult";
import { MatSnackBar } from "@angular/material";



@Component({
    selector:"user-phone-varification",
    templateUrl:"./html/user_phone_varification.html"
})
export class UserPhoneVarification{

    mobileVarificationForm:FormGroup;

    mobileNo:FormControl = new FormControl("",[]);

    otp:FormControl=new FormControl("",[]);

   

    
   
    countDown = new Observable<string>((observer: Subscriber<string>) => {
    
        let count:number=20;
        
        setInterval(() => {
            count--;
            if(count>0){
                observer.next("Send Again In "+count+" Sec")
            }

            if(count==0){
                observer.next("Send Otp Again");
                this.deactivated=false;
            }
          
        }, 1000);
      });


      countDownVoice = new Observable<string>((observer: Subscriber<string>) => {

        let count:number=40;

    
        setInterval(() => {
            count--;
            if(count>0){
                observer.next("Voice Otp "+count+" Sec")
            }

            if(count==0){
                observer.next("Send Otp By Voice Call");
                this.deactivatedVoiceOtp=false;
            }
          
        }, 1000);
      });



    deactivated:boolean=true;

    deactivatedVoiceOtp:boolean=true;


    constructor(private formBuilder:FormBuilder ,private acroute:ActivatedRoute , 
    private userService:UserService,private matSnackBar:MatSnackBar){
       
    }
    
    
    ngOnInit(){

        this.mobileVarificationForm=this.formBuilder.group({
            "mobileNo":this.mobileNo,
            "otp":this.otp
        });


        this.acroute.queryParams.subscribe((params)=>{
            this.mobileNo.setValue(params["mobileNo"]);
            console.log(params);
        });



    }

    
    sendOtpAgain(){
        this.userService.sendOtpAgainText(this.mobileNo.value).subscribe((data)=>{
            if(data!=undefined){
                let formResult:FormResult=data.json();
                if(formResult.result){
                    this.matSnackBar.open(formResult.message,"Done");
                }
                else{
                    this.matSnackBar.open(formResult.message,"Error");
                }
            }
        });
       
    }


    sendOtpAgainVoice(){
        this.userService.sendOtpAgainVoice(this.mobileNo.value).subscribe((data)=>{
            if(data!=undefined){
                let formResult:FormResult=data.json();
                if(formResult.result){
                    this.matSnackBar.open(formResult.message,"Done");
                }
                else{
                    this.matSnackBar.open(formResult.message,"Error");
                }
            }
        });
    }


    submit(){
         this.userService.varifyMobileNo(this.mobileVarificationForm.value).subscribe((data)=>{
            console.log(this.mobileVarificationForm); 
            if(data!=undefined){
                let formResult:FormResult=data.json();
                if(formResult.result){
                    this.matSnackBar.open(formResult.message,"Done");
                }
                else{
                    this.matSnackBar.open(formResult.message,"Error");
                }
             }
         });
    }
   

}