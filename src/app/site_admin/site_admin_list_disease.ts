import { Component } from "@angular/core";
import { Disease } from "../model/disease";
import { SiteAdminService } from "./site_admin_service";
import {ConfirmationDialog} from "../common/confirmation_dialog";
import {MatDialogRef,MatDialog} from "@angular/material";

@Component( {
    selector: "list-disease",
    templateUrl: "./html/list_disease.html"
} )

export class SiteAdminListDisease {

    diseases: Disease[];

    confirmationDialogRef:MatDialogRef<ConfirmationDialog>;

    constructor( private siteAdminService: SiteAdminService , private matDialog:MatDialog) {

    }

    ngOnInit() {
       this.getAllDisease();
    }

    getAllDisease(){

        this.siteAdminService.getAllDisease().subscribe(( data ) => {
            if ( data != undefined ) {
                this.diseases = data.json();
            }
        } );
    }

    remove(diseaseId){

        this.confirmationDialogRef=this.matDialog.open(ConfirmationDialog);
        console.log(diseaseId);

        this.confirmationDialogRef.afterClosed().subscribe((result)=>{
            if(result!=undefined){
                if(result){

                    this.siteAdminService.removeDisease(diseaseId).subscribe((data)=>{
                        if(data!=undefined){
                            let res=data;
                            if(res.status==200){
                                this.getAllDisease();
                            }
                        }
                    });

                }
            }
        });

       

    }

}