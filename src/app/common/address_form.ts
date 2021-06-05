/** This component contains a address form which have following fields 
 *  addressLineOne , addressLineTwo , state , city ,phoneNo
 *  It emmit an event changed which emit whenever the value of a 
 *  form field is changed */
import { Component, Output, EventEmitter } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Address } from "../model/address";
import { CommonService } from "./common_service";
import { State } from "../model/state";
import { City } from "../model/city";

@Component( {
    selector: "address-form",
    templateUrl: "./html/address_form.html"
} )

export class AddressForm {


    addressForm: FormGroup;

    //event of the component 
    @Output() changed: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    states: State[];

    cities: City[];

    addressLineOne: FormControl = new FormControl( '', [
        Validators.required
    ] );

    addressLineTwo: FormControl = new FormControl( '', [] );

    state: FormControl = new FormControl( '', [
        Validators.required
    ] );

    city: FormControl = new FormControl( '', [
        Validators.required
    ] );

    phoneNo: FormControl = new FormControl( '', [
        Validators.required
    ] );



    constructor( private formBuilder: FormBuilder, private commonService: CommonService ) {

    }

    ngOnInit() {

        this.getAllState();


        // ititalization of the form group 
        this.addressForm = this.formBuilder.group( {

            addressLineOne: this.addressLineOne,
            addressLineTwo: this.addressLineTwo,
            state: this.state,
            city: this.city,
            phoneNo: this.phoneNo
        } );

    }

    // get all states form the database 

    getAllState() {
        this.commonService.getAllState().subscribe(( data ) => {
            if ( data != undefined ) {
                this.states = data.json();
                console.log( this.states );

            }
        } );
    }

    /** gets all the cities for the state selected by user */
    getAllCities() {

        this.change();
        this.commonService.getAllCities( this.addressForm.value.state ).subscribe(( data ) => {
            if ( data != undefined ) {

                this.cities = data.json();
            }
        } );
    }

    // this emit the changed event whenever the form field value is changed 
    change() {


        this.changed.emit( this.addressForm );



    }


}