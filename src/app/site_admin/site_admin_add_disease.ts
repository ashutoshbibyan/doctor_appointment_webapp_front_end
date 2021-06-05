import { Component } from "@angular/core";
import { Disease } from "../model/disease";
import { SiteAdminService } from "./site_admin_service";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {FormResult}from "../model/formresult";

import {MatSnackBar} from "@angular/material";


@Component( {
    selector: "add-disease",
    templateUrl: "./html/add_disease.html"
} )
export class SiteAdminAddDisease {


    formResult:FormResult=new FormResult();

    diseaseForm: FormGroup;

    diseaseName: FormControl = new FormControl( "", [

        Validators.required

    ] );



    diseaseDiscription: FormControl = new FormControl( "", [

        Validators.required
    ] );


    constructor( private formBuilder: FormBuilder, private siteAdminService: SiteAdminService ,
    private matSnackBar:MatSnackBar) {

    }


    ngOnInit() {

        this.diseaseForm = this.formBuilder.group( {

            diseaseName: this.diseaseName,
            diseaseDiscription: this.diseaseDiscription

        } );


    }

    submit() {
        let disease: Disease = new Disease();
        disease.diseaseName = this.diseaseForm.value.diseaseName;
        disease.diseaseDiscription = this.diseaseForm.value.diseaseDiscription;
        this.siteAdminService.saveDisease( disease ).subscribe(( data ) => {
              if(data!=undefined){
                  this.formResult=data.json();

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