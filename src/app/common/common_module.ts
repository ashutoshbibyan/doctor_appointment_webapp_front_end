import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AddressForm } from "./address_form";
import { CommonService } from "./common_service";
import { MaterialModule } from "../material/material.module";
import { CommonModule } from "@angular/common";
import { UserImageUpload } from "./user_image_upload";
import { UserImageGallery } from "./user_image_gallery";
import { UserChooseProfileImage } from "./user_choose_profile_image";
import {ConfirmationDialog} from "./confirmation_dialog";


@NgModule( {
    imports: [MaterialModule, CommonModule, ReactiveFormsModule],
    declarations: [AddressForm, UserImageUpload, UserImageGallery, UserChooseProfileImage
    ,ConfirmationDialog],
    exports: [AddressForm, UserChooseProfileImage],
    providers: [CommonService]
} )

export class AppCommonModule {

}