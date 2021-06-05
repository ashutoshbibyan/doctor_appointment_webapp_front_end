import { Route, Routes } from "@angular/router";

import { SiteAdminAddDisease } from "./site_admin_add_disease";

import { SiteAdminAddState } from "./site_admin_add_state";

import { SiteAdminAddCity } from "./site_admin_add_city";

import { SiteAdminHome } from "./site_admin_home";

import { SiteAdminListCity } from "./site_admin_list_city";

import { SiteAdminListState } from "./site_admin_list_state";

import { SiteAdminAddDegree } from "./site_admin_add_degree";

import { SiteAdminListDegree } from "./site_admin_list_degree";

import { SiteAdminAddSpeciality } from "./site_admin_add_speciality";

import { SiteAdminListDisease } from "./site_admin_list_disease";

import {SiteAdminListSpecialities} from "./site_admin_list_specialities";


const siteAdminAddDisease: Route = { path: "admin/disease/add", component: SiteAdminAddDisease };

const siteAdminAddState: Route = { path: "admin/state/add", component: SiteAdminAddState };

const siteAdminAddCity: Route = { path: "admin/city/add", component: SiteAdminAddCity };

const siteAdminListCity: Route = { path: "admin/city/all/:stateId", component: SiteAdminListCity };

const siteAdminAddDegree: Route = { path: "admin/degree/add", component: SiteAdminAddDegree };

const siteAdminListDegree: Route = { path: "admin/degree/list", component: SiteAdminListDegree };

const siteAdminListDisease: Route = { path: "admin/disease/list", component: SiteAdminListDisease };

const siteAdminAddSpeciality: Route = { path: "admin/speciality/add", component: SiteAdminAddSpeciality};

const siteAdminListSpecialities:Route={path:"admin/speciality/list",component:SiteAdminListSpecialities};



const siteAdminListState: Route = {
    path: "admin/state/all", component: SiteAdminListState, children: [

        siteAdminListCity

    ]
};


const siteAdminHome: Route = {
    path: "admin/home", component: SiteAdminHome,
    children: [
        siteAdminAddDisease,
        siteAdminAddState,
        siteAdminAddCity,
        siteAdminListState,
        siteAdminAddDegree,
        siteAdminListDegree,
        siteAdminListDisease,
        siteAdminAddSpeciality,
        siteAdminListSpecialities
    ]
}

export const SiteAdminRoutes: Routes = [siteAdminHome];