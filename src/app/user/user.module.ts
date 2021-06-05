import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LogIn } from "./login";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user_routing_module";
import { UserSignup } from "./user_signup";
import { DoctorModule } from "../dr/doctor_module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from "./user_service";
import { HttpModule } from "@angular/http";
import { SiteMainFooter } from "../layout/site_main_footer";
import { SiteMainHeader } from "../layout/site_main_header";
import { UserPhoneVarification } from "app/user/user_phone_varification";


@NgModule( {
    imports: [MaterialModule, FormsModule, UserRoutingModule, DoctorModule, CommonModule
        , ReactiveFormsModule, HttpModule],
    declarations: [LogIn, UserSignup, SiteMainHeader, SiteMainFooter , UserPhoneVarification],
    providers: [UserService],
    exports: [LogIn, SiteMainFooter, SiteMainHeader,UserPhoneVarification]
} )
export class UserModule {

}
