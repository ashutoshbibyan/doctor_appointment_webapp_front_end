
import { Hours } from "./hours";



export class Day {
    public dayName: string;
    public dayId: number;
    public dayStatus: string = "Closed";
    public checked: boolean = false;
    public hours: Hours[] = new Array();



    constructor() {


    }



    public equals( dayid: number ): boolean {

        if ( this.dayId == dayid ) {
            return true;
        }

        return false;
    }

    public isChecked() {
        let result: boolean;
        if ( this.dayStatus == "Open" ) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    }
}