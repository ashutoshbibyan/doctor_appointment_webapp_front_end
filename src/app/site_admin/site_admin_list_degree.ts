import { Component } from "@angular/core";
import { FormResult } from "../model/formresult";
import { Degree } from "../model/degree";
import { SiteAdminService } from "./site_admin_service";
import {ConfirmationDialog} from "../common/confirmation_dialog";
import {MatDialog , MatDialogRef} from '@angular/material';


@Component( {
    selector: "list-degree",
    templateUrl: "./html/list_degree.html"
} )

export class SiteAdminListDegree {

    formResult: FormResult = new FormResult();

    confirmationDialogRef:MatDialogRef<ConfirmationDialog>;

    degrees: Degree[];

    constructor( private siteAdminService: SiteAdminService , private matDialog:MatDialog) {

    }

    ngOnInit() {
        
        this.getDegrees();
    }


    getDegrees(){

        this.siteAdminService.getAllDegree().subscribe(( data ) => {
            if ( data != undefined ) {
                this.degrees = data.json();
            }
        } );

    }


    remove(degreeId:string){

        this.confirmationDialogRef=this.matDialog.open(ConfirmationDialog);

        this.confirmationDialogRef.afterClosed().subscribe((result)=>{
            if(result!=undefined){
                if(result){

                    this.siteAdminService.removeDegree(degreeId).subscribe((data)=>{
                        if(data!=undefined){
                            if(data.status==200){
                                this.getDegrees();
                            }
                        }
                    });
                }
            }
        });

        
    }
}