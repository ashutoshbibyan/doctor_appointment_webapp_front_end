import { Route, Routes } from "@angular/router";
import { Home } from "./home";

const home: Route = { path: "", component: Home };

export const AppRoutes: Routes = [home];