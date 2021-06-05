import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Degree } from "../model/degree";
import { FormResult } from "../model/formresult";
import { SiteAdminService } from "./site_admin_service";
import { MatSnackBar} from "@angular/material";


@Component( {
    selector: "add-degree",
    templateUrl: "./html/add_degree.html"
} )

export class SiteAdminAddDegree {

    degreeForm: FormGroup;

    formResult: FormResult = new FormResult();

    degreeName: FormControl = new FormControl( "", [] );

    constructor( private formBuilder: FormBuilder, private siteAdminService: SiteAdminService ,
    private matSnackBar:MatSnackBar) {

        this.degreeForm = this.formBuilder.group( {
            degreeName: this.degreeName
        } );
    }


    submit() {
        let degree: Degree = new Degree();
        degree.degreeName = this.degreeForm.value.degreeName;
        this.siteAdminService.addDegree( degree ).subscribe(( data ) => {
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