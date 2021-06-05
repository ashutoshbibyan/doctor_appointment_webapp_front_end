import { Component } from "@angular/core";
import { SiteAdminService } from "./site_admin_service";
import { State } from "../model/state";
import {MatDialog,MatDialogRef} from "@angular/material";
import {SiteAdminListCity} from "./site_admin_list_city";
import {ConfirmationDialog} from "../common/confirmation_dialog";
import {SiteAdminAddCity} from "./site_admin_add_city";
@Component( {
    selector: "list-state",
    templateUrl: "./html/list_state.html"
} )
export class SiteAdminListState {

    states: State[];

    confirmationDialogRef:MatDialogRef<ConfirmationDialog>;

    constructor( private siteAdminService: SiteAdminService , private matDialog:MatDialog ) {

    }

    ngOnInit() {

        this.getAllStates();

    }

    getAllStates(){

        this.siteAdminService.getAllState().subscribe(( data ) => {
            if ( data != undefined ) {
                this.states = data.json();
            }
        } );

    }

    /*** removeState takes stateid and remove it from the database */
   
    removeState(stateId){

        this.confirmationDialogRef=this.matDialog.open(ConfirmationDialog);

        this.confirmationDialogRef.afterClosed().subscribe((data)=>{
            if(data!=undefined){
              
                if(data){

                    this.siteAdminService.removeState(stateId).subscribe((data)=>{
                        if(data!=undefined){
                            let res=data;
                            if(res.status==200){
                                this.getAllStates();
                            }
                        }
                    });

                }

            }
        });

       
    }

    addCity(stateId){
        
        this.matDialog.open(SiteAdminAddCity,{
            data:{stateId:stateId},
            height:"700px",
            width:"800px"
        });
    }


    showCities(stateId){
    
       this.matDialog.open(SiteAdminListCity,{
            data:{stateId:stateId},
            height:"700px",
            width:"800px"
        });
    }
}