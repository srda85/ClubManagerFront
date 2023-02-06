import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {IEleve} from "./eleve";
import {IEleveTab} from "./tableEleve";

@Injectable({
  providedIn:'root'
  })

export class EleveService {

  private eleveUrl='http://localhost:8080/ClubManager/eleves/all'

  private deleteUrl='http://localhost:8080/ClubManager/eleves/'

  private tabUrl='http://localhost:8080/ClubManager/eleves/allforTab'

  private putUrl='http://localhost:8080/ClubManager/eleves/'


  constructor(private http:HttpClient) {

  }

  getEleves():Observable<IEleve[]>{
    return this.http.get<IEleve[]>(this.eleveUrl)
  }

  getElevesForTabOnly():Observable<IEleveTab[]>{
    return this.http.get<IEleveTab[]>(this.tabUrl)
  }

  deleteEleve(id:string){
    return this.http.delete(this.deleteUrl+id).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  updateEleve(form:any, id:string){
    console.log("PUT")
    this.http.put(this.putUrl+id,form).subscribe((res)=> {
      console.log(res)})
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


