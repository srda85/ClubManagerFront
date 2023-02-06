import {Component, OnInit, ViewChild} from '@angular/core';
import {IAbonnement} from "./abonnement";
import {Subscription} from "rxjs";
import {AbonnementService} from "./abonnement.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css']
})
export class AbonnementListComponent implements OnInit {

  abonnements:IAbonnement[]=[]

  sub:Subscription|undefined
  erroMessage:string=""

  constructor(
    private abonnementService:AbonnementService,
    private router:Router
  ) {}


  //region matTable
  dataMatableAbonnements!:MatTableDataSource<IAbonnement>
  //Si erreur could not fin column with id ... eleve ça venait d'ici. Peut-être que le displayed columns était en conflit avec celui de élève liste
  displayedColumns:String[]=['eleve','debutAbonnement','finAbonnement','montant']
  @ViewChild(MatSort) matSortAbo!:MatSort;
  //Obligatoire pour faire le lien en la pagination et le tableau
  @ViewChild('paginator')paginator!:MatPaginator

  filterData($event :any){
    this.dataMatableAbonnements.filter=$event.target.value;
  }

  //endregion

  //region liens

  versfFormAbonnement():void{
    this.router.navigate(["/abonnement-form"])
  }

  //endregion

  //region NG

  ngOnInit(): void {

    this.sub=this.abonnementService.getAbonnements().subscribe({
      next:abonnement=>{
        this.abonnements=abonnement
        this.dataMatableAbonnements=new MatTableDataSource<IAbonnement>(this.abonnements);
        this.dataMatableAbonnements.paginator=this.paginator;
        this.paginator._intl.itemsPerPageLabel="Abonnements par page";
        this.dataMatableAbonnements.sort=this.matSortAbo;
      },
      error:err => this.erroMessage,
      })
    this.dataMatableAbonnements=new MatTableDataSource<IAbonnement>(this.abonnements);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  //endregion
}
