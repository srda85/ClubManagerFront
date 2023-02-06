import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {EleveListComponent} from "./eleve/eleve-list.component";
import {LoginComponent} from "./login/login.component";


//Un tableau de routes est créé
const routes:Routes=[
  {path:'login', component:LoginComponent},
  {path: 'welcome', component: WelcomeComponent},
  //redirige vers une page par défaut quand l'application se "charge"
  {path: "", redirectTo: "welcome", pathMatch: "full"},
  //chemin générique, normalement on le redirige vers une page 404 au cas où le chemin n'est pas bon.
  {path: "**", redirectTo: "welcome", pathMatch: "full"},
  {path:'eleves',component:EleveListComponent},
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
