import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PatientRoutes } from "./patient_routing_config";


@NgModule( {
    imports: [RouterModule.forChild( PatientRoutes )],
    declarations: [],
    exports: [RouterModule]
} )

export class PatientRoutingModule {

}