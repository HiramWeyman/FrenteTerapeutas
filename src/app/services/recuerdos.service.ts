import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recuerdos } from '../modules/interfaces/recuerdos';

@Injectable({
  providedIn: 'root'
})
export class RecuerdosService {
  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }

  getRecuerdos(id:number): Observable<Recuerdos> {
		return this.http.get(`${this.urlEndPoint}/Recuerdos/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaRecuerdos(paciente: Recuerdos): Observable<Recuerdos> {
    return this.http.post<Recuerdos>(`${environment.rutaAPI + '/Recuerdosinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaRecuerdos(id: number, paciente: Recuerdos): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Recuerdosupdate/${id}`, paciente)
  }

  public EliminaRecuerdos(id: number, paciente: Recuerdos): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/RecuerdosDelete/${id}`, paciente)
  }
}
