import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DoctorSignup } from "./doctor_signup";
import { MaterialModule } from "../material/material.module";
import { DoctorRoutingModule } from "./doctor_routing_module";
import { DoctorHome } from "./doctor_home";
import { DoctorAppointmentSetup } from "./doctor_appointment_setup";
import { DoctorHoliday } from "./doctor_holiday";
import { DoctorPanel } from "./doctor_panel";
import { DoctorMakeAppointment } from "./doctor_make_appointment";
import { DoctorAppointmentShow } from "./doctor_appointment_show";
import { DoctorHolidayShow } from "./doctor_holiday_show";
import { DoctorService } from "./doctor_service";
import { DoctorPublicProfile } from "./doctor_public_profile";
import { DoctorProfileEdit } from "./doctor_profile_edit";
import { AppCommonModule } from "../common/common_module";
import { DoctorAddWorkingHours } from "./doctor_add_working_hours";
import { UserChooseProfileImage } from "../common/user_choose_profile_image";
import { DoctorWritePrescription } from "./doctor_write_prescription";




@NgModule( {
    imports: [MaterialModule, FormsModule, DoctorRoutingModule, ReactiveFormsModule, CommonModule
        , AppCommonModule

    ],
    declarations: [DoctorSignup, DoctorHome, DoctorAppointmentSetup, DoctorHoliday, DoctorPanel
        , DoctorMakeAppointment, DoctorAppointmentShow, DoctorHolidayShow, DoctorAddWorkingHours
        , DoctorPublicProfile, DoctorProfileEdit, DoctorWritePrescription],
    providers: [DoctorService],
    exports: [DoctorSignup],
    entryComponents: [UserChooseProfileImage, DoctorWritePrescription]

} )

export class DoctorModule {

}