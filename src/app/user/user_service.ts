import { Injectable } from "@angular/core";
import { RequestOptions, Headers, Http } from "@angular/http";
import { User } from "./user";
import { URLSearchParams } from "@angular/http";




@Injectable()
export class UserService {

    headers: Headers = new Headers( { 'Content-Type': 'application/json' } );
    commOptions: RequestOptions = new RequestOptions( { headers: this.headers } );

    constructor( private http: Http ) {

    }


    userSignup( user: User ) {

        let url = "/api/public/signup/user";
        return this.http.post( url, user, this.commOptions );

    }

    userLogin( user: User ) {
        let url = "/user/login";

        let body = new URLSearchParams();

        body.set( "userName", user.mobileNo );
        body.set( "password", user.password );

        let headers = new Headers( { 'Content-Type': 'application/x-www-form-urlencoded' } );

        let options = new RequestOptions( { headers: headers } );

        return this.http.post( url, body.toString(), options );
    }


    userLogout(){
        let url="/logout";

        return this.http.post(url,this.commOptions);
    }


    getCurrentUser(){
        let url="/api/public/get/currentuser";

        return this.http.get(url,this.commOptions);
    }


    sendOtpAgainText(mobileNo:string){
        console.log(mobileNo);
        let url ="/api/public/user/resend/otp";

        let params:URLSearchParams = new URLSearchParams();
        params.set("mobileNo",mobileNo);
        params.set("retryType","text");

        this.commOptions.params=params;

        return this.http.get(url,this.commOptions);


    }


    sendOtpAgainVoice(mobileNo:string){

        let url ="/api/public/user/resend/otp";

        let params:URLSearchParams = new URLSearchParams();
        params.set("mobileNo",mobileNo);
        params.set("retryType","voice");

        this.commOptions.params=params;

        return this.http.get(url,this.commOptions);


    }

    varifyMobileNo(body){
        let url="/api/public/user/mobileno/verify";
        let params:URLSearchParams= new URLSearchParams();
        params.set("mobileNo",body.mobileNo);
        params.set("otp",body.otp);

        this.commOptions.params=params;

        return this.http.get(url,this.commOptions);

    }
}