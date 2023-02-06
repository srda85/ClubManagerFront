import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {IAbonnement} from "./abonnement";
import {IAbonnementUpdate} from "./AbonnementUpdate";


@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  private urlGetAll="http://localhost:8080/ClubManager/abonnements/all"

  private urlPost="http://localhost:8080/ClubManager/abonnements/"

  private urlGetAllForUdate="http://localhost:8080/ClubManager/abonnements/allForUpdate"

  private urlUpdate="http://localhost:8080/ClubManager/abonnements/"


  constructor(private http:HttpClient) {
  }

  getAbonnements():Observable<IAbonnement[]>{
    return this.http.get<IAbonnement[]>(this.urlGetAll)
  }

  getAbonnementsForUpdate():Observable<IAbonnementUpdate[]>{
  return this.http.get<IAbonnementUpdate[]>(this.urlGetAllForUdate)
  }


  postAbonnement(form:any){
    console.log(form.debutAbonnement)
    console.log("POST")
    this.http.post(this.urlPost,form).subscribe((res)=> {
      console.log(res)
    })
  }

  update(form:any, idAbo:string){
    console.log('PUT')
    this.http.put(this.urlUpdate+idAbo,form).subscribe((res)=> {
      console.log(res)})
  }
  delete(idAbo:string){
    console.log('DELETE')
    this.http.delete(this.urlPost+idAbo).subscribe((res)=>
    console.log(res))
  }





  //region méthode de gestion de l'exception
  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
