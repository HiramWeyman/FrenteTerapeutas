import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SituacionAct } from '../modules/interfaces/situacionact';

@Injectable({
  providedIn: 'root'
})
export class SituacionesService {

  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }


  getSituacion(id:number): Observable<SituacionAct> {
		return this.http.get(`${this.urlEndPoint}/Situacion/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaSituacion(paciente: SituacionAct): Observable<SituacionAct> {
  console.log(paciente);
    return this.http.post<SituacionAct>(`${environment.rutaAPI + '/Situacioninsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaSituacion (id: number, paciente: SituacionAct): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Situacionupdate/${id}`, paciente)
  }

  public EliminarSituacion (id: number, paciente: SituacionAct): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/SituacionDelete/${id}`, paciente)
  }
}
