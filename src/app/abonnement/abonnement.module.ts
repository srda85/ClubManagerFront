import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbonnementListComponent} from "./abonnement-list.component";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import { AbonnementFormComponent } from './abonnement-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import { AbonnementEditComponent } from './abonnement-edit.component';




@NgModule({
  declarations: [
    AbonnementListComponent,
    AbonnementFormComponent,
    AbonnementEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "abonnement", component: AbonnementListComponent},
      {path: "abonnement-form", component: AbonnementFormComponent}
    ]),
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
    MatSelectModule
  ]
})
export class AbonnementModule { }
