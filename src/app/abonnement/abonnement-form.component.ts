import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ɵElement} from "@angular/forms";
import {AbonnementService} from "./abonnement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../shared/DataService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-abonnement-form',
  templateUrl: './abonnement-form.component.html',
  styleUrls: ['./abonnement-form.component.css']
})
export class AbonnementFormComponent implements OnInit {


  dateMin=new Date(Date.now())
  dateMax=new Date(Date.now())


  subscription!:Subscription
  nomPrenom: string | undefined;
  id!: string
  abonnementForm!:FormGroup<{ [K in keyof { debutAbonnement: FormControl<any>; montant: FormControl<any>; dureeAbonnement: FormControl<any>; eleveId: FormControl<any> }]: ɵElement<{ debutAbonnement: FormControl<any>; montant: FormControl<any>; dureeAbonnement: FormControl<any>; eleveId: FormControl<any> }[K], null> }>

  dureeAbonnement:number[]=[1,3,6,12]



  constructor(
    private formbuilder:FormBuilder,
    private abonnementService:AbonnementService,
    private route : ActivatedRoute,
    private router:Router,
    private data : DataService
    ){
    //A configurer selon les envies mais ici mis 1 ans en arrière max
    this.dateMin.setFullYear(this.dateMin.getFullYear()-2)

  }




  //region méthode
  retourLink():void{
    this.router.navigate(['/eleve/'+this.id])

  }

  //endregion

  onSubmit(){

    if (this.abonnementForm.valid){
      console.log(this.abonnementForm.value)
      this.abonnementService.postAbonnement(this.abonnementForm.value)
    }
    this.retourLink()
  }

  ngOnInit(): void {
    this.subscription=this.data.currentMessage.subscribe(message => this.nomPrenom = message)
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.id=id.toString()
    this.abonnementForm=this.formbuilder.group({
      debutAbonnement: new FormControl("",[Validators.required]),
      dureeAbonnement: new FormControl("",[Validators.required]),
      montant: new FormControl("",[Validators.required, Validators.pattern('^[0-9]*$')]),
      eleveId: new FormControl(id),
    })
  }

  //il semble que ceci permette un meilleur raffrachissement
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
