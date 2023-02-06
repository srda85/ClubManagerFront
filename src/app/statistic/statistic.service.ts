import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IEleve} from "../eleve/eleve";
import {IStatistic} from "./statistic";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private statistiqueUrl='http://localhost:8080/ClubManager/statistiques/all'


  constructor(private http:HttpClient) {

  }

  getStatistiques():Observable<IStatistic[]>{
    return this.http.get<IStatistic[]>(this.statistiqueUrl)
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
  //endregion
}
