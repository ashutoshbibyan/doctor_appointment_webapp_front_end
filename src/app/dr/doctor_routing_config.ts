import { Route, Routes } from "@angular/router";
import { DoctorSignup } from "./doctor_signup";
import { DoctorHoliday } from "./doctor_holiday";
import { DoctorHome } from "./doctor_home";
import { DoctorAppointmentSetup } from "./doctor_appointment_setup";
import { DoctorPanel } from "./doctor_panel";
import { DoctorMakeAppointment } from "./doctor_make_appointment";
import { DoctorAppointmentShow } from "./doctor_appointment_show";
import { DoctorHolidayShow } from "./doctor_holiday_show";
import { DoctorAddWorkingHours } from "./doctor_add_working_hours";
import { DoctorPublicProfile } from "./doctor_public_profile";
import { DoctorProfileEdit } from "./doctor_profile_edit";

const doctorAppointment: Route = { path: "dr/appointment", component: DoctorAppointmentSetup };
const doctorProfileEdit: Route = { path: "profile/edit", component: DoctorProfileEdit };
const doctorHoliday: Route = { path: "dr/holiday", component: DoctorHoliday };
const doctorSignUp: Route = { path: "dr/signup", component: DoctorSignup };
const doctorPanel: Route = { path: "dr/panel", component: DoctorPanel };
const doctorMakeAppointment: Route = { path: "dr/make/appointment", component: DoctorMakeAppointment };
const doctorAppointmentShow: Route = { path: "dr/show/appointment", component: DoctorAppointmentShow };
const doctorHolidayShow: Route = { path: "dr/show/holiday", component: DoctorHolidayShow };
const doctorAddWorkingHours: Route = { path: "dr/add/hours", component: DoctorAddWorkingHours };
const doctorPublicProfile: Route = { path: "dr/public/profile/:docId", component: DoctorPublicProfile }


const doctorHome: Route = {
    path: "dr/home", component: DoctorHome, children: [
        { path: "", component: DoctorPanel },
        doctorSignUp,
        doctorAppointment,
        doctorHoliday,
        doctorPanel,
        doctorMakeAppointment,
        doctorAppointmentShow,
        doctorHolidayShow,
        doctorAddWorkingHours,
        doctorProfileEdit

    ]
};


export const DoctorRoutes: Routes = [doctorHome, doctorPublicProfile];

