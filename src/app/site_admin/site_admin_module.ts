import { NgModule } from "@angular/core";


import { SiteAdminHome } from "./site_admin_home";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SiteAdminAddDisease } from "./site_admin_add_disease";

import { SiteAdminRoutingModule } from "./site_admin_routing_module";

import { MaterialModule } from "../material/material.module";

import { SiteAdminAddState } from "./site_admin_add_state";
import { SiteAdminListState } from "./site_admin_list_state";

import { SiteAdminAddCity } from "./site_admin_add_city";
import { SiteAdminListCity } from "./site_admin_list_city";
import { SiteAdminService } from "./site_admin_service";
import { SiteAdminAddDegree } from "./site_admin_add_degree";
import { SiteAdminListDegree } from "./site_admin_list_degree";
import { SiteAdminListDisease } from "./site_admin_list_disease";
import { SiteAdminAddSpeciality } from "./site_admin_add_speciality";
import {SiteAdminListSpecialities} from "./site_admin_list_specialities";
import {ConfirmationDialog} from "../common/confirmation_dialog";


@NgModule( {
    imports: [SiteAdminRoutingModule, MaterialModule, ReactiveFormsModule, CommonModule],
    declarations: [SiteAdminAddDisease, SiteAdminAddState, SiteAdminAddCity, SiteAdminHome, SiteAdminListCity
        , SiteAdminListState, SiteAdminAddDegree, SiteAdminListDegree, SiteAdminListDisease, SiteAdminAddSpeciality
    ,SiteAdminListSpecialities],
    exports: [],
    providers: [SiteAdminService],
    entryComponents:[ConfirmationDialog]
} )

export class SiteAdminModule {

}