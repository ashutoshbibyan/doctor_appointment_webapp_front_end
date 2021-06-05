import { Component ,Inject } from "@angular/core";
import { SiteAdminService } from "./site_admin_service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { City } from "../model/city";
import {MAT_DIALOG_DATA, MatDialog,MatDialogRef}from "@angular/material";
import {ConfirmationDialog} from "../common/confirmation_dialog";
import 'rxjs/add/operator/switchMap';


@Component( {
    selector: "list-city",
    templateUrl: "./html/list_city.html"
} )

export class SiteAdminListCity {


    
    stateId: string;

    cities: City[];

    confimationDialogRef:MatDialogRef<ConfirmationDialog>;


    constructor( private siteAdminService: SiteAdminService , @Inject(MAT_DIALOG_DATA) public data:any,
private matDialog:MatDialog) {


    }

    ngOnInit() {

        this.stateId=this.data.stateId;
       
        this.getAllCity();
       

    }

    getAllCity(){

        this.siteAdminService.getAllCity(this.stateId).subscribe((data)=>{
            if(data!=undefined){
                this.cities=data.json();
            }
        });
    }

    remove(index){
       
        this.confimationDialogRef=this.matDialog.open(ConfirmationDialog);

        this.confimationDialogRef.afterClosed().subscribe((result)=>{
            if(result!=undefined){
                if(result){

                    this.cities.splice(index,1);
                    
                    this.siteAdminService.removeCity(this.cities,this.stateId).subscribe((data)=>{
                        console.log(data);
                    });
                }
            }
        });

        
    }
}