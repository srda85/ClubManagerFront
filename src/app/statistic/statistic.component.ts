import {Component, OnInit, ViewChild} from '@angular/core';
import {IStatistic} from "./statistic";
import {Subscription} from "rxjs";
import {StatisticService} from "./statistic.service";
import {MatTableDataSource} from "@angular/material/table";
import {IEleve} from "../eleve/eleve";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  //region attributs et constructeur

  statistiques:IStatistic[]=[]
  sub: Subscription|undefined;
  errorMessage: string=""


  constructor(private statisticService:StatisticService) {
  }
  //endregion

  //region matPaginator

  //Obligatoire pour faire le lien en la pagination et le tableau
  @ViewChild('paginator')paginator!:MatPaginator

  filterData($event :any){
    this.dataMatTableStat.filter=$event.target.value;
  }
  //endregion

  dataMatTableStat!:MatTableDataSource<IStatistic>
  displayedColumnsStat=["annee","mois","nbrInscriptions",
    "nbrElevesInscrits",
    // "nbrCeintureBlanche","nbrCeintureBleue",
    // "nbrCeintureViolette",
    "montantTotal"]

  //region NG

  ngOnInit(): void {
    this.sub=this.statisticService.getStatistiques().subscribe({
      next:statistics => {
        this.statistiques=statistics;
        //pe a jeter tant que je fais pas de tri :
        // this.elevesTrie=eleves;
        this.dataMatTableStat=new MatTableDataSource<IStatistic>(this.statistiques);
        this.dataMatTableStat.paginator=this.paginator;
        this.paginator._intl.itemsPerPageLabel="Stats par page";
        // this.dataMatTable.sort=this.matSort;
      },
      error:err => this.errorMessage=err,
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  //endregion

}
