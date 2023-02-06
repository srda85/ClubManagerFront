import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators, ɵElement} from "@angular/forms";
import {AbonnementService} from "./abonnement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../shared/DataService";
import {IAbonnement} from "./abonnement";
import {IAbonnementUpdate} from "./AbonnementUpdate";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-abonnement-edit',
  templateUrl: './abonnement-edit.component.html',
  styleUrls: ['./abonnement-edit.component.css']
})
export class AbonnementEditComponent implements OnInit {

  dateMin = new Date(Date.now())
  dateMax = new Date(Date.now())


  abonnementList!:IAbonnementUpdate[]
  abonnement!:IAbonnementUpdate
  subscription!: Subscription
  nomPrenom: string | undefined;
  id!: string
  dureeAbonnement: number[] = [1, 3, 6, 12]


  constructor(
    private formbuilder: FormBuilder,
    private abonnementService: AbonnementService,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService
  ) {
    //A configurer selon les envies mais ici mis 10 ans en arrière max
    this.dateMin.setFullYear(this.dateMin.getFullYear() - 10)
  }

  abonnementForm=this.formbuilder.group({
    debutAbonnement:new FormControl(),
    montant:new FormControl(),
    dureeAbonnement: new FormControl(),
    eleveId:new FormControl()
  })


  //region méthode
  retourLink(): void {
    this.router.navigate(['/eleve/' + this.abonnementForm.value.eleveId])
  }

  chargerAbonnement():void{
    const idAbo = Number(this.route.snapshot.paramMap.get('id'))
    this.id = idAbo.toString()
    this.subscription=this.abonnementService.getAbonnementsForUpdate().subscribe({
      next: abonnements => {
        this.abonnementList = abonnements.filter(item => item.id == idAbo)
        this.abonnement=this.abonnementList[0]
        this.abonnementGroupSetValue()
      },
    })
  }

  abonnementGroupSetValue():void{
    this.abonnementForm.setValue({
      debutAbonnement:this.abonnement.debutAbonnement,
      montant:this.abonnement.montant,
      dureeAbonnement: this.abonnement.dureeAbonnement,
      eleveId:this.abonnement.eleveId
    })
  }

  //endregion

  onSubmit() {

    if (this.abonnementForm.valid) {
      console.log(this.abonnementForm.value)
      // a changer
      this.abonnementService.update(this.abonnementForm.value,this.id)
    }
    this.retourLink()
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.nomPrenom = message)
    this.chargerAbonnement()
  }
}
