import { NgModule } from "@angular/core";

import { SiteAdminRoutes } from "./site_admin_routing_config";
import { RouterModule } from "@angular/router";


@NgModule( {
    imports: [RouterModule.forChild( SiteAdminRoutes )],
    declarations: [],
    exports: [RouterModule],
    providers: []
} )

export class SiteAdminRoutingModule {

}