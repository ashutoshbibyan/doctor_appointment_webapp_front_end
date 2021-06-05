import { Address } from "../model/address";
import { Hours } from "../model/hours";
import { Day } from "../model/day";
import { Degree } from "../model/degree";
import { Speciality } from "../model/speciality";
import { DoctorService } from "./doctor_service";
import { UserFile } from "../model/userfile";


export class Doctor {

    public docId: string;
    public name: string;
    public about: string;
    public degrees: Degree[];
    public maxAppointments: number;
    public specialities: Speciality[];
    public workingDays: Day[] = new Array();
    public addrLineOne: string;
    public addrLineTwo: string;
    public state: string;
    public city: string;
    public phoneno: string;
    public appointmentFee: number;
    public timeSlots: Hours[] = new Array();

    public profileImage: UserFile = new UserFile();
    public holidays: Date[];



}