import { Route, Routes } from "@angular/router";
import { UserSignup } from "./user_signup";
import { LogIn } from "./login";
import { UserPhoneVarification } from "app/user/user_phone_varification";


const userSignup: Route = { path: "user/signup", component: UserSignup };
const userLogin: Route = { path: "user/login", component: LogIn };
const userPhoneVarification:Route={path:"user/phone/varification",component:UserPhoneVarification}

export const UserRoutes: Routes = [userSignup, userLogin,userPhoneVarification];
