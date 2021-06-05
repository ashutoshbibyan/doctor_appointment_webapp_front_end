import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserRoutes } from "./user_routing_config";

@NgModule( {
    imports: [RouterModule.forChild( UserRoutes )],
    exports: [RouterModule],
    declarations: []

} )


export class UserRoutingModule {

}