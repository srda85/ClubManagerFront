import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private postUrl='http://localhost:8080/ClubManager/eleves'

  constructor(private http:HttpClient) {
  }

  postInscription(form:any){
    console.log("POST")
    this.http.post(this.postUrl,form).subscribe((res)=> {
      console.log(res)})
  }



}
