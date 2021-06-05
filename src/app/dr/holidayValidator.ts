import { FormControl, ValidatorFn } from "@angular/forms";



export function holidayValidator( holidays: Date[] ) {



    return function( c: FormControl ) {

        console.log( c.value );

        let forbidden: boolean = false;

        let selectedDate: Date = new Date( c.value );

        for ( let i = 0; i < holidays.length; i++ ) {

            let currentDate: Date = holidays[i];

            console.log( selectedDate );
            console.log( currentDate );

            if ( selectedDate == currentDate ) {

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