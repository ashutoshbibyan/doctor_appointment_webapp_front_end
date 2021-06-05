import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DoctorRoutes } from "./doctor_routing_config";


@NgModule( {
    imports: [RouterModule.forChild( DoctorRoutes )],
    declarations: [],
    exports: [RouterModule]

} )

export class DoctorRoutingModule {

}