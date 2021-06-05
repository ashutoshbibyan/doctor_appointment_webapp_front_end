import { Route, Routes } from "@angular/router";
import { PatientSignup } from "./patient_signup";
import { PatientHome } from "./patient_home";
import { PatientProfile } from "./patient_profile";
import { PatientMakeAppointment } from "./patient_make_appointment";
import { PatientAddAddress } from "./patient_add_address";
import { SearchDocUsingDocid } from "./search_doc_using_docid";
import { SearchDocUsingDocName } from "./search_doc_using_docname";
import { SearchDocUsingSpeciality } from "./search_doc_using_speciality";
import { ShowDoctorAdded } from "./show_doctors_added";
import { AddDoctor } from "./add_doctor";
import { AppointmentWithAddedDoctor } from "./appointment_with_added_doctor";
import { MakeAppointment } from "./make_appointment";
import { PatientMakeAppointmentWithoutLogin} from "./patient_make_appointment_without_login";

const patientSignup: Route = { path: 'patient/signup', component: PatientSignup };

const patientAddAddress: Route = { path: 'patient/add/address', component: PatientAddAddress };

const patientProfile: Route = { path: 'patient/profile', component: PatientProfile }

const searchDocUsingDocid: Route = { path: "search/using/docid", component: SearchDocUsingDocid };

const searchDocUsingDocName: Route = { path: "search/using/docname", component: SearchDocUsingDocName };

const searchDocUsingSpeciality: Route = { path: "search/using/speciality", component: SearchDocUsingSpeciality };

const showDoctorAdded: Route = { path: "show/doc/added", component: ShowDoctorAdded };

const addDoctor: Route = { path: "add/doctor", component: AddDoctor };

const appointmentWithAddedDoctor: Route = { path: "appointment/with/added/doctor", component: AppointmentWithAddedDoctor };

const patientMakeAppointment: Route = { path: "patient/make/appointment", component: PatientMakeAppointment };

const makeAppointment: Route = { path: "make/appointment/:docId", component: MakeAppointment }

const makeFreeAppointment:Route={path:"make/appointment/without/login",component:PatientMakeAppointmentWithoutLogin}


const patientHome: Route = {
    path: "patient/home", component: PatientHome, children: [

        { path: "", component: PatientMakeAppointment },
        patientSignup,
        patientMakeAppointment,
        patientAddAddress,
        searchDocUsingDocid,
        searchDocUsingDocName,
        searchDocUsingSpeciality,
        showDoctorAdded,
        addDoctor,
        appointmentWithAddedDoctor,
        makeAppointment,
        makeFreeAppointment

    ]
};


export const PatientRoutes: Routes = [patientHome, patientProfile];