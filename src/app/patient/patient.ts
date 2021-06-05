import { Disease } from "../model/disease";
import { Address } from "../model/address";


export class Patient {

    public name: string;
    public phoneNo: string;
    public diseases: Disease[] = new Array();
    public dateOfBirth: Date = new Date();
    public address: Address = new Address();

}