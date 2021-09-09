import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Constelacion} from '../modules/interfaces/constelacion';

@Injectable({
  providedIn: 'root'
})
export class ConstelacionService {

  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }

  getConstelacion(id:number): Observable<Constelacion> {
		return this.http.get(`${this.urlEndPoint}/Constelacion/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaConstelacion(paciente: Constelacion): Observable<Constelacion> {
  console.log(paciente);
    return this.http.post<Constelacion>(`${environment.rutaAPI + '/Constelacioninsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaConstelacion(id: number, paciente: Constelacion): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Constelacionupdate/${id}`, paciente)
  }

  public EliminaConstelacion(id: number, paciente: Constelacion): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/ConstelacionDelete/${id}`, paciente)
  }
}
