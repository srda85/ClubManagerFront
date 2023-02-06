import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatisticComponent} from "./statistic.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    StatisticComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: "statistic", component: StatisticComponent}
        ]),
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class StatisticModule { }
