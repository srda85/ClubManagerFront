import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {InscriptionService} from "./inscription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriptionControl = new FormControl<String|null>(null,Validators.required)
  ceinture:string[]=["blanche","bleue","violette","marron","noire"]
  role:string[]=["coach","élève"]

  constructor(private formBuilder:FormBuilder,
              private inscriptioNService:InscriptionService,
              private router:Router) {}

  eleveForm=this.formBuilder.group({
      nom:new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.pattern(/^[a-zA-ZÀ-ÿ-. ]*$/), Validators.required]),
      prenom:new FormControl('',[Validators.minLength(2), Validators.maxLength(255),Validators.pattern(/^[a-zA-ZÀ-ÿ-. ]*$/), Validators.required]),
      dateNaissance:new FormControl('',Validators.required),
      adresse:new FormControl('',[Validators.pattern('^[\\w\'\\-,.]*[^_!¡?÷?¿\\/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]*$'), Validators.required,Validators.minLength(1), Validators.maxLength(255)]),
      gsm:new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(6)]),
      email:new FormControl('',[Validators.email,Validators.required]),
      ceinture:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required)
    })


  onSubmit(){
    //permet de voir dans la console le contenu du formulaire
    if (this.eleveForm.valid){
      console.log("Formulaire valide", this.eleveForm.value)
      this.inscriptioNService.postInscription(this.eleveForm.value)
      this.clearForm()
    }
  }

  clearForm(){
    this.eleveForm.reset()
    this.initializeForm()
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


  // public myError = (controlName: string, errorName: string) =>{
  //   return this.eleveForm.controls[controlName].hasError(errorName);
  // }

  ngOnInit(): void {
  }

  refreshCompononent():void{
    this.router.navigate([this.router.url])
  }



}
