import {Component} from "@angular/core";
import {Speciality} from "../model/speciality";
import {CommonService} from "../common/common_service";
import {MatDialog,MatDialogRef} from "@angular/material";
import {ConfirmationDialog} from "../common/confirmation_dialog";
import {SiteAdminService} from "./site_admin_service";


@Component({
    selector:"list-specialities",
    templateUrl:"./html/list_specialities.html"
})
export class SiteAdminListSpecialities {

    specialities:Speciality[]= new Array();

    confimationDialogRef:MatDialogRef<ConfirmationDialog>;

    constructor(private commonService:CommonService , private matDialog:MatDialog ,
    private siteAdminService:SiteAdminService){

    }

    ngOnInit(){

       this.getSpeciality();

    }

    getSpeciality(){
        this.commonService.getAllSpeciality().subscribe((data)=>{
            if(data!=undefined){
                this.specialities=data.json();
            }
        });
    }

    remove(specialityName:string){

        this.confimationDialogRef=this.matDialog.open(ConfirmationDialog);

        this.confimationDialogRef.afterClosed().subscribe((result)=>{
            if(result){
                this.siteAdminService.removeSpeciality(specialityName).subscribe((data)=>{
                    if(data!=undefined){
                        if(data.status==200){
                            this.getSpeciality();
                        }
                    }
                });

            }
        });

    }

}