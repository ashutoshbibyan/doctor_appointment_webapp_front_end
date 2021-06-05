import { FormControl, ValidatorFn } from "@angular/forms";



export function holidayValidator( holidays: Date[] ) {



    return function( c: FormControl ) {

        let forbidden: boolean = false;

        let selectedDate: Date = new Date( c.value );

        for ( let i = 0; i < holidays.length; i++ ) {

            let currentDate = holidays[i];

            if ( selectedDate.getTime() == currentDate.getTime() ) {

                forbidden = true;

            }

        }

        return forbidden ? { forbiddendate: true } : null;

    };

    //    let currentDate: Date = new Date();
    //    let selectedDate: Date = new Date( c.value );
    //    let forbidden: boolean = false;
    //    if ( selectedDate.getFullYear() == currentDate.getFullYear() &&
    //        selectedDate.getMonth() == currentDate.getMonth() &&
    //        selectedDate.getDate() == currentDate.getDate() ) {
    //        forbidden = true;
    //    }
    //
    //
    //    return forbidden ? { todaydate: true } : null;


}