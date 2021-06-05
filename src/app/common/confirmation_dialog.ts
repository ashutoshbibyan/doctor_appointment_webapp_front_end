import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material";


@Component({
    selector:"confirmation-dialog",
    templateUrl:"./html/confirmation_dialog.html"
})

export class ConfirmationDialog  {


    constructor(private matDialogRef:MatDialogRef<ConfirmationDialog>){

    }

    confirm(){
        
        this.matDialogRef.close(true);
    }

    cancel(){
        this.matDialogRef.close(false);
    }

}