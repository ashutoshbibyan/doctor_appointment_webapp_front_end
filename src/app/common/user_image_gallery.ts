import { Component, EventEmitter, Output, Input } from "@angular/core";
import { CommonService } from "./common_service";
import { MatSnackBar, PageEvent } from "@angular/material";
import { UserFile } from "../model/userfile";


@Component( {
    selector: "user-gallery",
    templateUrl: "./html/user_image_gallery.html",
    styleUrls: ["./css/user_image_gallery.css"]
} )

export class UserImageGallery {

    @Output()
    selected: EventEmitter<UserFile> = new EventEmitter();

    @Input()
    reload: boolean;


    images: string[] = new Array();

    pageNo: number = 0;

    pageSize: number = 10;

    totalImages: number;

    selectedFile: UserFile = new UserFile();



    constructor( private commonService: CommonService, private matSnackBar: MatSnackBar ) {

    }


    ngOnInit() {
        this.getAllImages( this.pageNo, this.pageSize );



    }


    ngOnChanges() {

        if ( this.reload ) {
            this.getAllImages( this.pageNo, this.pageSize );

        }
    }

    getAllImages( pageNo: number, pageSize: number ) {

        this.commonService.getUserImages( pageNo, pageSize ).subscribe(( data ) => {
            if ( data != undefined ) {
                this.images = data.json().content;
                this.totalImages = data.json().totalElements;
            }
        } );
    }


    imgSelected( image: UserFile ) {

        this.selectedFile = image;
        this.selected.emit( image );

    }



    getPage( event: PageEvent ) {
        this.getAllImages( event.pageIndex, event.pageSize );
    }


}