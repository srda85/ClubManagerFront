import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {EleveModule} from "./eleve/eleve.module";
import {AbonnementModule} from "./abonnement/abonnement.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {StatisticModule} from "./statistic/statistic.module";
import {InscriptionModule} from "./inscription/inscription.module";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import { ConfirmComponent } from './dialog/confirm.component';
import {MatDialogModule} from "@angular/material/dialog";
import {
  DateAdapter, MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  NativeDateAdapter
} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

//Pour installer moment : npm i @angular/material-moment-adapter
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./_helpers/auth.interceptor";
import {MatCardModule} from "@angular/material/card";



const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};






@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ConfirmComponent,
    LoginComponent,
  ],
    imports: [
        EleveModule,
        AbonnementModule,
        StatisticModule,
        InscriptionModule,
        BrowserModule,
        HttpClientModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        MatCardModule

    ],
  providers: [
    [authInterceptorProviders],
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    {provide: MAT_DATE_LOCALE, useValue:'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
