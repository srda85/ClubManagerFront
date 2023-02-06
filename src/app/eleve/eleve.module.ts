import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EleveComponent} from "./eleve.component";
import {RouterModule} from "@angular/router";
import { EleveListComponent } from './eleve-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {AbonnementListComponent} from "../abonnement/abonnement-list.component";
import { EleveEditComponent } from './eleve-edit.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {AbonnementFormComponent} from "../abonnement/abonnement-form.component";
import {AbonnementEditComponent} from "../abonnement/abonnement-edit.component";



@NgModule({
  declarations: [
    EleveComponent,
    EleveListComponent,
    EleveEditComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
          {path: "eleve", component: EleveListComponent},
          {path: "eleve/:id", component: EleveComponent},
          {path: "eleve-edit/:id", component: EleveEditComponent},

          //Si je suis dans un autre dossier mais au même niveau, je dois préciser le nom du dossier.
          {path: "abonnement/abonnement-form/:id",component : AbonnementFormComponent},
          {path:"abonnement/abonnement-edit/:id",component: AbonnementEditComponent}
        ]),
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule,
        MatIconModule
    ]
})
export class EleveModule { }
