import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EleveService} from "./eleve.service";
import {IEleve} from "./eleve";
import {Subscription} from "rxjs";
import {AbonnementService} from "../abonnement/abonnement.service";
import {IAbonnement} from "../abonnement/abonnement";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataService} from "../shared/DataService";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../dialog/confirm.component";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent implements OnInit, OnDestroy {

  //region attributs et constructeur
  eleve!:IEleve
  eleveList:IEleve[]|undefined
  sub!:Subscription
  subAbo!:Subscription
  private errorMessage:any
  abonnementsList!:IAbonnement[]
  message: string | undefined;


  constructor(private route:ActivatedRoute,
              private router:Router,
              private eleveService : EleveService,
              private abonnementService:AbonnementService,
              private data:DataService,
              private dialog : MatDialog) {
  }

  //endregion

  //region NG

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.sub=this.eleveService.getEleves().subscribe({
      next: eleves => {
        this.eleveList=eleves.filter(item =>item.id===id)
        this.eleve=this.eleveList[0]
        this.getAllab()
    },
      error:err => this.errorMessage=err})

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  //endregion

  //region Mat Table
  dataMatableAbonnements!:MatTableDataSource<IAbonnement>
  displayedColumns:String[]=['debutAbonnement','finAbonnement','montant','boutons']
  @ViewChild('paginator')paginator!:MatPaginator
  @ViewChild(MatSort) matSortAbo!:MatSort;

  //endregion


  //region Méthodes


  getAllab():void{
  this.subAbo=this.abonnementService.getAbonnements().subscribe({
    next : abonnements => {
      this.abonnementsList=abonnements.filter(item => item.eleveId===this.eleve.id)
      this.dataMatableAbonnements=new MatTableDataSource<IAbonnement>(this.abonnementsList)
      this.dataMatableAbonnements.paginator=this.paginator;
      this.paginator._intl.itemsPerPageLabel="Abonnements par page";
      this.dataMatableAbonnements.sort=this.matSortAbo;
    }
  })
}

  deleteEleve():any{
    this.eleveService.deleteEleve(this.eleve.id.toString())

}

  retourLink():void{
    this.router.navigate(['/eleve'])
  }

  updateLink():void{
    this.router.navigate(['/eleve-edit',this.eleve.id])
  }

  refreshCompononent():void{
   this.router.navigate([this.router.url])
  }

  ajouterUnAbonnement():void {
    this.router.navigate(['/abonnement/abonnement-form',this.eleve.id])

    //quand j'exécute la méthode je donne une valeur à data qui pourra être récupèrée ailleurs
    this.data.changeMessage(this.eleve.nom+" "+this.eleve.prenom)
  }

  editerUnAbonnement(idAbo:number):void{
   this.router.navigate(['abonnement/abonnement-edit',idAbo])
    this.data.changeMessage(this.eleve.nom+" "+this.eleve.prenom)
}

  supprimerUnabonnement(idAbo:number):void{
    this.abonnementService.delete(idAbo.toString())
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmComponent,{
      data:{
        message: "Êtes vous sûr de vouloir supprimer l'élève : "+this.eleve.prenom+" "+this.eleve.nom
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteEleve();
        this.retourLink()
      }
    });
  }

  openDialogAbo(idAbo:number) {
    const dialogRef = this.dialog.open(ConfirmComponent,{
      data:{
        message: "Vous êtes sur le point de supprimer un abonnement"
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.supprimerUnabonnement(idAbo);
      }
    });

  }




  //endregion

}
