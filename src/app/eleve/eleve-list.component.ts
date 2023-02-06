import {Component, OnInit, ViewChild} from '@angular/core';
import {IEleve} from "./eleve";
import {Subscription} from "rxjs";
import {EleveService} from "./eleve.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router, RouterLink} from "@angular/router";
import {IEleveTab} from "./tableEleve";


@Component({
  selector: 'app-eleve-list',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css']
})
export class EleveListComponent implements OnInit {



  //region attributs et constructeur
  eleves: IEleveTab[]=[]
  elevesTrie:IEleveTab[]=[]
  sub: Subscription|undefined;
  errorMessage: string=""
  routerLink!:RouterLink

  //J'utilise cette variable uniquement lorsque je mets des donnée dans la barre de recherche
  private _filtreListe=""

  constructor(private eleveService:EleveService, private router:Router) {

  }

  //endregion

  //region matTable
  dataMatTable!:MatTableDataSource<IEleveTab>
  displayedColumns=["nom","prenom","ceinture","statut","lien"]

  //endregion

  //region matSort

  @ViewChild(MatSort) matSort!:MatSort;

  //endregion

  //region matPaginator

  //Obligatoire pour faire le lien en la pagination et le tableau
  @ViewChild('paginator')paginator!:MatPaginator

  filterData($event :any){
    this.dataMatTable.filter=$event.target.value;
  }
  //endregion

  //region Get Set


  //endregion



  //region méthodes


  link(id:number):void{
    this.router.navigate(['/eleve',id])
  }


  //endregion


  //region NG
  ngOnInit(): void {

    this.sub=this.eleveService.getElevesForTabOnly().subscribe({
      next: eleves => {
        this.eleves=eleves.filter(item => item.nom!="CORBEILLE")
        console.log(eleves)
        this.dataMatTable=new MatTableDataSource<IEleveTab>(this.eleves);
        this.dataMatTable.paginator=this.paginator;
        this.paginator._intl.itemsPerPageLabel="Eleves par page";
        this.dataMatTable.sort=this.matSort;
      },
      error:err => this.errorMessage=err,
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  //endregion



}
