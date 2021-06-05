import { LocalTime } from "js-joda";
export class Hours {
    public startAt: string;
    public closeAt: string;
    public maxPatientNo: number;





    constructor() {

    }



    public equal( hours: Hours ): boolean {

        let result: boolean = false;

        if ( hours.startAt == this.startAt && hours.closeAt == this.closeAt ) {

            if ( this.maxPatientNo == hours.maxPatientNo ) {
                result = true;
            }

        }
        return result;
    }


}