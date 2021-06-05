import { Component ,Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { SiteAdminService } from "./site_admin_service";
import { State } from "../model/state";
import { City } from "../model/city";
import { FormResult } from "../model/formresult";
import {MatSnackBar , MAT_DIALOG_DATA} from "@angular/material";

@Component( {
    selector: "add-city",
    templateUrl: "./html/add_city.html"
} )
export class SiteAdminAddCity {

    cityForm: FormGroup;

    formResult: FormResult = new FormResult();

    states: State[] = new Array();

    cityName: FormControl = new FormControl( "", [
        Validators.required
    ] );

    cityPincode: FormControl = new FormControl( "", [
        Validators.required
    ] );

    stateId: FormControl = new FormControl( "", [
        Validators.required
    ] );



    constructor( private formBuilder: FormBuilder, private siteAdminService: SiteAdminService ,
    private matSnackBar:MatSnackBar ,@Inject(MAT_DIALOG_DATA) private data) {

    }


    ngOnInit() {
        this.getAllState();
        this.cityForm = this.formBuilder.group( {
            cityName: this.cityName,
            stateId: this.stateId,
            cityPincode: this.cityPincode
        } );

       this.stateId.setValue(this.data.stateId);
    }

    getAllState() {
        this.siteAdminService.getAllState().subscribe(( data ) => {
            if ( data.json() != undefined ) {
                this.states = data.json();
            }
        } );
    }



    submit() {

        let city: City = new City();
        city.cityName = this.cityForm.value.cityName;
        city.cityPincode = this.cityForm.value.cityPincode;
        let stateId = this.cityForm.value.stateId;
        console.log(stateId);
        this.siteAdminService.addCity( city, stateId ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.formResult = data.json();
                if(this.formResult.result){
                    this.matSnackBar.open(this.formResult.message,"Done",{
                        duration:3000
                    });
                }
                else if(this.formResult.error){
                    this.matSnackBar.open(this.formResult.message,"Error",{
                        duration:3000
                    });
                }

            }
        } );
    }
}