import { Component, Output, EventEmitter } from "@angular/core";
import { CommonService } from "./common_service";
import { FormResult } from "../model/formresult";
import { MatSnackBar } from "@angular/material";


@Component( {
    selector: "user-img-upload",
    templateUrl: "./html/user_image_upload.html",
    styleUrls: ["./css/user_image_upload.css"]

} )

export class UserImageUpload {

    progress: boolean = false;

    @Output()
    uploaded: EventEmitter<boolean> = new EventEmitter();


    constructor( private commonService: CommonService, private matSnackBar: MatSnackBar ) {

    }




    upload( event ) {



        let fileList: FileList = event.target.files;
        if ( fileList.length > 0 ) {
            this.progress = true;
            let file: File = fileList[0];

            let formData: FormData = new FormData();
            formData.append( 'img', file, file.name );

            this.commonService.uploadImage( formData ).subscribe(( data ) => {

                if ( data != undefined ) {
                    let result: FormResult = data.json();

                    if ( result.result ) {

                        this.progress = false;
                        this.uploaded.emit( true );
                        this.matSnackBar.open( result.message, "Saved", {
                            duration: 3000
                        } );
                    }

                    else {
                        if ( result.error ) {
                            this.progress = false;
                            this.matSnackBar.open( result.message, "Error", {
                                duration: 3000
                            } );
                        }
                    }
                }

            } );
        }

    }





}