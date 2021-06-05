export class Time {
    public hour: number;
    public minute: number;
    public meridien: string;


    public stringToTime( time: string ) {

        let timeArr: string[] = time.split( ":" );
        this.hour = parseInt( timeArr[0] );
        this.minute = parseInt( timeArr[1] );
        if ( this.hour > 12 ) {
            this.meridien = "PM";
            this.hour = this.hour - 12;
        }

        else {
            this.meridien = "AM";
        }
    }

    public equal( time: Time ): boolean {
        let result: boolean = false;

        if ( this.hour == time.hour && this.minute == time.minute ) {
            if ( this.meridien == time.meridien ) {
                result = true;
            }
        }
        return result;

    }

    public timeToString() {
        return this.hour.toString().concat( " : " ).concat( this.minute.toString() ).concat( this.meridien );
    }


}