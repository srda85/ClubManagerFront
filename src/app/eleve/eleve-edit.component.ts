import { Component, OnInit } from '@angular/core';
import {IEleve} from "./eleve";
import {Subscription} from "rxjs";
import {IAbonnement} from "../abonnement/abonnement";
import {ActivatedRoute, Router} from "@angular/router";
import {EleveService} from "./eleve.service";
import {AbonnementService} from "../abonnement/abonnement.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-eleve-edit',
  templateUrl: './eleve-edit.component.html',
  styleUrls: ['./eleve-edit.component.css']
})
export class EleveEditComponent implements OnInit {

  eleve!:IEleve
  eleveList:IEleve[]|undefined
  sub!:Subscription
  private errorMessage:any
  ceintureList:string[]=["blanche","bleue","violette","marron","noire"]
  role:string[]=["coach","élève"]



  constructor(private route:ActivatedRoute,
              private router:Router,
              private eleveService : EleveService,
              private abonnementService:AbonnementService,
              private formBuilder:FormBuilder
  ){}

  //region FormBuilder

  eleveForm=this.formBuilder.group({
    nom:new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.pattern(/^[a-zA-ZÀ-ÿ-. ]*$/), Validators.required]),
    prenom:new FormControl('',[Validators.minLength(2), Validators.maxLength(255),Validators.pattern(/^[a-zA-ZÀ-ÿ-. ]*$/), Validators.required]),
    dateNaissance:new FormControl('',Validators.required),
    adresse:new FormControl('',[Validators.pattern('^[\\w\'\\-,.]*[^_!¡?÷?¿\\/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]*$'), Validators.required,Validators.minLength(1), Validators.maxLength(255)]),
    gsm:new FormControl('',[Validators.required, Validators.minLength(6)]),
    email:new FormControl('',[Validators.email,Validators.required]),
    ceinture:new FormControl('',Validators.required),
    role:new FormControl('',Validators.required)
  })

  //endregion


  ngOnInit(): void {
    this.chargerEleve()
  }



  //region Méthodes

  chargerEleve():void{
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.sub=this.eleveService.getEleves().subscribe({
      next: eleves => {
        this.eleveList=eleves.filter(item =>item.id===id)
        this.eleve=this.eleveList[0]
        this.formGroupSetValue()
      },
      error:err => this.errorMessage=err})
  }

  retourLink():void{
   this.router.navigate(['/eleve/'+this.eleve.id])
  }

  formGroupSetValue():void{
    this.eleveForm.setValue({
      nom: this.eleve.nom,
      prenom: this.eleve.prenom,
      dateNaissance: this.eleve.dateNaissance.toString(),
    adresse: this.eleve.adresse,
    gsm: this.eleve.gsm,
    email: this.eleve.email,
    ceinture: this.eleve.ceinture,
      role :this.eleve.role
  })
  }

  onSubmit(){
    //permet de voir dans la console le contenu du formulaire
    if (this.eleveForm.valid){
      console.log("Formulaire valide", this.eleveForm.value)
      console.log("Valeure de l'ID :"+this.eleve.id.toString())
      this.eleveService.updateEleve(this.eleveForm.value,this.eleve.id.toString())

      //Changer pour mettre la bonne adresse, faut la créer de le service de l'élève
      //this.inscriptioNService.postInscription(this.eleveForm.value)
      //this.chargerEleve()
    }
    this.retourLink()
  }

  clearForm(){
    this.eleveForm.reset()
    this.initializeForm()
    console.log("form data is ",this.eleveForm.value)
  }

  private initializeForm(){
    this.eleveForm.setValue({
      nom: "",
      prenom: "",
      dateNaissance: "",
      adresse: "",
      gsm:"",
      email:"",
      ceinture:"",
      role:""
    });
  }

  //il semble que ceci permette un meilleur raffrachissement
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


  //endregion

}
