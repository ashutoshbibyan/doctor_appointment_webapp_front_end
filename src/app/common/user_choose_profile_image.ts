import { Component } from "@angular/core";
import { UserFile } from "../model/userfile";
import { DoctorService } from "../dr/doctor_service";
import { FormResult } from "../model/formresult";
import { MatSnackBar, MatTabChangeEvent } from "@angular/material";



@Component( {
    selector: "user-choose-profile-image",
    templateUrl: "./html/user_choose_profile_image.html",
    styleUrls: ["./css/user_choose_profile_image.css"]
} )

export class UserChooseProfileImage {

    selectedFile: UserFile;

    reloadGallery: boolean = false;

    btnDisable: boolean = true;

    tabIndex: number;



    constructor( private doctorService: DoctorService, private matSnackBar: MatSnackBar ) {

    }


    /** uploaded method execute when userimageupload component emmit the upload event 
     *  it means that file is uploaded so we change the tab to gallery tab and reloadGallery 
     *  to true so the gallery is refreshed and have the uploaded  image */

    uploaded( event ) {
        if ( event ) {
            this.tabIndex = 1;
            this.reloadGallery = true;
        }

    }



    /** file selected execute userimagegallery component emmit the select event  it means that 
     *  user selected a file so we enable the submit button and change the value of the 
     *  selectedFile to the file selected by user*/
    fileSelected( event ) {
        if ( event != undefined ) {
            this.btnDisable = false;
            this.selectedFile = event;
        }


    }


    /** submit execute when user submit the profile image for the user it save it into the database*/
    submit() {

        this.doctorService.saveDoctorProfileImage( this.selectedFile ).subscribe(( data ) => {
            if ( data != undefined ) {
                let formResult: FormResult = data.json();
                if ( formResult.result ) {

                    this.matSnackBar.open( formResult.message, "Image Changed", {
                        duration: 3000
                    } );
                }
            }
        } );
    }


    /**tabChanged execute whenever the tab is changed */

    tabChanged( event: MatTabChangeEvent ) {
        if ( event.index == 0 ) {


            /* we make reloadGallery false so when user upload another file it will get 
             * true and ngOnChange in gallery component will detect and refresh the list 
             * of all the images */
            this.reloadGallery = false;

            // disable the submit button 
            this.btnDisable = true;
        }
    }



    //    btnHover(){
    //        if(this.btnDisable){
    //            
    //        }
    //    }




}