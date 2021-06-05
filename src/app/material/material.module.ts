import { NgModule } from "@angular/core";
import {
    MatInputModule, MatGridListModule, MatMenuModule, MatIconModule
    , MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatButtonModule
    , MatTabsModule, MatCheckboxModule, MatRadioModule, MatStepperModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, NativeDateAdapter
    , DateAdapter, MAT_DATE_FORMATS, MatSlideToggleModule, MatTableModule, MatTooltipModule,
    MatAutocompleteModule, MatToolbarModule, MatCardModule, MatPaginatorModule, MatSnackBarModule
    , MatProgressBarModule, MatDialogModule

} from "@angular/material";


@NgModule( {
    imports: [MatInputModule, MatGridListModule, MatMenuModule, MatIconModule
        , MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatButtonModule
        , MatTabsModule, MatCheckboxModule, MatRadioModule, MatStepperModule, MatSelectModule
        , MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatTableModule, MatTooltipModule
        , MatAutocompleteModule, MatToolbarModule, MatCardModule, MatPaginatorModule, MatSnackBarModule
        , MatProgressBarModule, MatDialogModule

    ],

    declarations: [],

    providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],

    exports: [MatInputModule, MatGridListModule, MatMenuModule, MatIconModule
        , MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatButtonModule
        , MatTabsModule, MatCheckboxModule, MatRadioModule, MatStepperModule, MatSelectModule
        , MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatTableModule, MatTooltipModule
        , MatAutocompleteModule, MatToolbarModule, MatCardModule, MatPaginatorModule, MatSnackBarModule
        , MatProgressBarModule, MatDialogModule
    ]
} )
export class MaterialModule {



}