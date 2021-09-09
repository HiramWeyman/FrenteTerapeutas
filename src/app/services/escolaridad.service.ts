import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Escolar } from '../modules/interfaces/escolaridad';

@Injectable({
  providedIn: 'root'
})
export class EscolaridadService {
  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }

  getEscolar(id:number): Observable<Escolar> {
		return this.http.get(`${this.urlEndPoint}/Escolar/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaEscolar(paciente: Escolar): Observable<Escolar> {
    return this.http.post<Escolar>(`${environment.rutaAPI + '/Escolarinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaEscolar(id: number, paciente: Escolar): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Escolarupdate/${id}`, paciente)
  }

  public EliminaEscolar(id: number, paciente: Escolar): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/EscolarDelete/${id}`, paciente)
  }
}
