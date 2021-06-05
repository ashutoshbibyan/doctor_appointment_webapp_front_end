
import { Hours } from "../model/hours";
import { Prescription } from "./prescription";


export class Appointment {

    public appointmentId: string;
    public date: Date;
    public doctorId: string;
    public patientId: string;
    public doctorName: string;
    public patientName: string;
    public patientPhoneNo: string;
    public status: string;
    public refund: boolean;
    public hours: Hours;
    public dayId: number;

    public prescription: Prescription = new Prescription();


}
