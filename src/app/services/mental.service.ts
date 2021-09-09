import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Mental } from '../modules/interfaces/mental';


@Injectable({
  providedIn: 'root'
})
export class MentalService {
  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }

  getMental(id:number): Observable<Mental> {
		return this.http.get(`${this.urlEndPoint}/Mental/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaMental(paciente: Mental): Observable<Mental> {
    return this.http.post<Mental>(`${environment.rutaAPI + '/Mentalinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaMental(id: number, paciente: Mental): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Mentalupdate/${id}`, paciente)
  }

  public EliminaMental(id: number, paciente: Mental): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/MentalDelete/${id}`, paciente)
  }
}
