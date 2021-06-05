import { Component } from "@angular/core";

import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

import { State } from "../model/state";

import { FormResult } from "../model/formresult";

import { SiteAdminService } from "./site_admin_service";

import {MatSnackBar} from "@angular/material";


@Component( {
    selector: "add-state",
    templateUrl: "./html/add_state.html"
} )
export class SiteAdminAddState {

    stateForm: FormGroup;

   formResult: FormResult = new FormResult();

    stateName: FormControl = new FormControl( "", [
        Validators.required
    ] );

    constructor( private formBuilder: FormBuilder, private siteAdminService: SiteAdminService ,
    private matSnackBar:MatSnackBar) {


    }

    ngOnInit() {
        this.stateForm = this.formBuilder.group( {
            stateName: this.stateName
        } );
    }


    submit() {
        let state: State = new State();
        state.stateName = this.stateForm.value.stateName;
        this.siteAdminService.addState( state ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.formResult = data.json();

                if(this.formResult.result){
                    this.matSnackBar.open(this.formResult.message,"Done",{
                        duration:3000
                    });
                }
                else if (this.formResult.error){
                    this.matSnackBar.open(this.formResult.message,"Error",{
                        duration:3000
                    });
                }
            }
        } );
    }

}