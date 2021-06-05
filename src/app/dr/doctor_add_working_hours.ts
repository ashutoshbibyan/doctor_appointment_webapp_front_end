import { Component } from "@angular/core";
import { MatSlideToggleChange, MatSelectChange } from "@angular/material";
import { DoctorService } from "./doctor_service";
import { FormResult } from "../model/formresult";
import {Router} from "@angular/router";
import { Day } from "../model/day";
import { Time } from "../model/time";
import { HourListOption } from "../model/hourListOptions";
import { Doctor } from "./doctor";
import { Hours } from "../model/hours";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import 'hammerjs';
import { LocalTime } from "js-joda";
import { MatSnackBar } from "@angular/material";

@Component( {
    selector: "add-hours",
    templateUrl: "./html/add_hours.html",
    styleUrls: ["./css/add_hours.css"]
} )
export class DoctorAddWorkingHours {

    progress: boolean = true;

    workState: string = "closed";

    workingDays: Day[] = new Array();

    formResult: FormResult = new FormResult();

    doctor: Doctor = new Doctor();


    workingHoursForm: FormGroup;

    mondayControl: FormControl = new FormControl( "", [] );

    mondayStartAt: FormControl = new FormControl( "", [] );

    mondayCloseAt: FormControl = new FormControl( "", [] );

    mondayAppointmentNo: FormControl = new FormControl( "", [] );

    tuesdayControl: FormControl = new FormControl( "", [] );

    tuesdayStartAt: FormControl = new FormControl( "", [] );

    tuesdayCloseAt: FormControl = new FormControl( "", [] );

    tuesdayAppointmentNo: FormControl = new FormControl( "", [] );

    wednesdayControl: FormControl = new FormControl( "", [] );

    wednesdayStartAt: FormControl = new FormControl( "", [] );

    wednesdayCloseAt: FormControl = new FormControl( "", [] );

    wednesdayAppointmentNo: FormControl = new FormControl( "", [] );

    thursdayControl: FormControl = new FormControl( "", [] );

    thursdayStartAt: FormControl = new FormControl( "", [] );

    thursdayCloseAt: FormControl = new FormControl( "", [] );

    thursdayAppointmentNo: FormControl = new FormControl( "", [] );

    fridayControl: FormControl = new FormControl( "", [] );

    fridayStartAt: FormControl = new FormControl( "", [] );

    fridayCloseAt: FormControl = new FormControl( "", [] );

    fridayAppointmentNo: FormControl = new FormControl( "", [] );

    saturdayControl: FormControl = new FormControl( "", [] );

    saturdayStartAt: FormControl = new FormControl( "", [] );

    saturdayCloseAt: FormControl = new FormControl( "", [] );

    saturdayAppointmentNo: FormControl = new FormControl( "", [] );

    sundayControl: FormControl = new FormControl( "", [] );

    sundayStartAt: FormControl = new FormControl( "", [] );

    sundayCloseAt: FormControl = new FormControl( "", [] );

    sundayAppointmentNo: FormControl = new FormControl( "", [] );


    mondayCode: number = 1;
    tuesdayCode: number = 2;
    wednesdayCode: number = 3;
    thursdayCode: number = 4;
    fridayCode: number = 5;
    saturdayCode: number = 6;
    sundayCode: number = 0;


    hourListOption = HourListOption;


    constructor( private formBuilder: FormBuilder, private doctorService: DoctorService
        , private matSnackbar: MatSnackBar,private router:Router) {

    }


    ngOnInit() {

        this.workingHoursForm = this.formBuilder.group( {
            "mondayControl": this.mondayControl,
            "mondayStartAt": this.mondayStartAt,
            "mondayCloseAt": this.mondayCloseAt,
            "mondayAppointmentNo": this.mondayAppointmentNo,
            "tuesdayControl": this.tuesdayControl,
            "tuesdayStartAt": this.tuesdayStartAt,
            "tuesdayCloseAt": this.tuesdayCloseAt,
            "tuesdayAppointmentNo": this.tuesdayAppointmentNo,
            "wednesdayControl": this.wednesdayControl,
            "wednesdayStartAt": this.wednesdayStartAt,
            "wednesdayCloseAt": this.wednesdayCloseAt,
            "wednesdayAppointmentNo": this.wednesdayAppointmentNo,
            "thursdayControl": this.thursdayControl,
            "thursdayStartAt": this.thursdayStartAt,
            "thursdayCloseAt": this.thursdayCloseAt,
            "thursdayAppointmentNo": this.thursdayAppointmentNo,
            "fridayControl": this.fridayControl,
            "fridayStartAt": this.fridayStartAt,
            "fridayCloseAt": this.fridayCloseAt,
            "fridayAppointmentNo": this.fridayAppointmentNo,
            "saturdayControl": this.saturdayControl,
            "saturdayStartAt": this.saturdayStartAt,
            "saturdayCloseAt": this.saturdayCloseAt,
            "saturdayAppointmentNo": this.saturdayAppointmentNo,
            "sundayControl": this.sundayControl,
            "sundayStartAt": this.sundayStartAt,
            "sundayCloseAt": this.sundayCloseAt,
            "sundayAppointmentNo": this.sundayAppointmentNo



        } );


        this.getDoctorWorkingDays();






    }







    /** getDoctorWorkingdays Method */

    getDoctorWorkingDays() {

        this.doctorService.getDoctorPublicInfo().subscribe(( data ) => {
            if ( data != undefined ) {

                if(data["_body"]!=""){

                    let res= data.json();

                    if ( res.workingDays != null ) {

                        this.workingDays = res.workingDays;
    
                        this.progress = false;
    
    
                    }
    
                    else {
                        this.progress = false;
                    }


                }

                else{

                    this.router.navigateByUrl("/dr/home/dr/signup");
                }

                




            }
        } );


    }




    checked( event: MatSlideToggleChange ) {



        if ( event.checked ) {

            let day: Day = new Day();

            day.dayId = parseInt( event.source.id );
            day.dayName = event.source.name;
            day.dayStatus = "Open";
            day.checked = true;
            console.log( day );
            this.workingDays.push( day );


        }
        else {

            for ( let i = 0; i < this.workingDays.length; i++ ) {
                if ( this.workingDays[i].dayId == ( parseInt( event.source.id ) ) ) {

                    this.workingDays.splice( i, 1 );
                }
            }

        }

    }



    submit() {

        this.addDayHour( this.mondayStartAt.value, this.mondayCloseAt.value, this.mondayAppointmentNo.value, this.mondayCode );
        this.addDayHour( this.tuesdayStartAt.value, this.tuesdayCloseAt.value, this.tuesdayAppointmentNo.value, this.tuesdayCode );
        this.addDayHour( this.wednesdayStartAt.value, this.wednesdayCloseAt.value, this.wednesdayAppointmentNo.value, this.wednesdayCode );
        this.addDayHour( this.thursdayStartAt.value, this.thursdayCloseAt.value, this.thursdayAppointmentNo.value, this.thursdayCode );
        this.addDayHour( this.fridayStartAt.value, this.fridayCloseAt.value, this.fridayAppointmentNo.value, this.fridayCode );
        this.addDayHour( this.saturdayStartAt.value, this.saturdayCloseAt.value, this.saturdayAppointmentNo.value, this.saturdayCode );
        this.addDayHour( this.sundayStartAt.value, this.sundayCloseAt.value, this.sundayAppointmentNo.value, this.sundayCode );



        console.log( this.workingDays );
        this.doctorService.saveWorkingDays( this.workingDays ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.formResult = data.json();
                if ( this.formResult.result ) {
                    this.matSnackbar.open( this.formResult.message, "Done", {
                        duration: 3000
                    } );
                }
                else {
                    if ( this.formResult.error ) {
                        this.matSnackbar.open( this.formResult.message, "Error", {
                            duration: 3000
                        } );
                    }
                }
            }
        } );




    }

    /** addDayHour execute when user click on addhour button it takes three parameter 
     *  startAt , closeAt ,maxpatientno,  dayid  and add the hour object to day with that dayid */

    addDayHour( startAt: string, closeAt: string, maxPatientNo: number, dayId: number ) {

        if ( startAt != "" && closeAt != "" ) {

            if ( maxPatientNo != 0 ) {



                let hours: Hours = new Hours();


                hours.startAt = startAt;
                hours.closeAt = closeAt;


                hours.maxPatientNo = maxPatientNo;



                for ( let i = 0; i < this.workingDays.length; i++ ) {

                    if ( this.workingDays[i].dayId == dayId ) {

                        let hoursArr: Hours[] = this.workingDays[i].hours;

                        if ( hoursArr.length == 0 ) {

                            hoursArr.push( hours );

                        }
                        else {

                            let isExist: boolean = false;

                            for ( let j = 0; j < hoursArr.length; j++ ) {


                                if ( hoursArr[j].startAt == hours.startAt && hoursArr[j].closeAt == hours.closeAt ) {


                                    isExist = true;
                                }



                            }

                            if ( !isExist ) {
                                hoursArr.push( hours );
                            }
                        }


                        this.workingDays[i].hours = hoursArr;
                    }
                }
            }


        }

        else {


            if ( maxPatientNo != 0 ) {
                let hours: Hours = new Hours();

                if ( startAt == "24" || closeAt == "24" ) {
                    hours.startAt = '00:00';
                    hours.closeAt = '23:59';
                    hours.maxPatientNo = maxPatientNo;
                    let hourArr: Hours[] = new Array();
                    hourArr.push( hours );

                    this.workingDays[this.getADayIndex( dayId )].hours = hourArr;


                }
            }
        }


    }



    /** getADayIndex  method get the index value of the day in the workingday array 
     *  it check by using the dayid */

    public getADayIndex( dayId: number ): number {

        let dayIndex: number;


        if ( this.workingDays.length > 0 ) {

            for ( let i = 0; i < this.workingDays.length; i++ ) {

                if ( this.workingDays[i].dayId == dayId ) {
                    dayIndex = i;
                }
            }

        }

        return dayIndex;

    }

    /** get a day method get the day object from workingday array using dayid */
    getADay( dayid: number ): Day {
        let day: Day = this.workingDays[this.getADayIndex( dayid )];

        if ( day == undefined ) {
            day = new Day();
        }
        return day;
    }

    /** getTimeLabel get the label value for a time the label value is for display only */
    getTimeLabel( value: string ): string {
        for ( let i = 0; i < this.hourListOption.length; i++ ) {

            if ( this.hourListOption[i].value == value ) {
                return this.hourListOption[i].label;
            }
        }

        return "";
    }

    /** hourDelete method remove a perticular hour value from a day present in the workingDays array
     *  it do so by  using the dayid and hour index value */
    hourDelete( dayid: number, hourIndex: number ) {
        this.workingDays[this.getADayIndex( dayid )].hours.splice( hourIndex, 1 );
    }


    /** hourSelected method run whenever use select a hour value this method check if user
     *  is choose the 24 hour value if so then we remove all the previous value and add only 
     *  one value for 24 hours */

    hourSelected( value: string, dayid: number ) {

        let hour: Hours = new Hours();
        hour.startAt = "00:00";
        hour.closeAt = "23:59";



        if ( value != "24" ) {

            let oldHours: Hours[] = new Array();
            oldHours = this.getADay( dayid ).hours;

            for ( let i = 0; i < oldHours.length; i++ ) {

                if ( hour.equal( oldHours[i] ) ) {

                    this.workingDays[this.getADayIndex( dayid )].hours.splice( i, 1 );

                }
            }
        }



    }




}
