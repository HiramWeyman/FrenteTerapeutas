import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ajustes } from '../modules/interfaces/ajustes';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {

  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }


  getAjustes(id:number): Observable<Ajustes> {
		return this.http.get(`${this.urlEndPoint}/Ajustes/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaAjustes(paciente: Ajustes): Observable<Ajustes> {
  console.log(paciente);
    return this.http.post<Ajustes>(`${environment.rutaAPI + '/Ajustesinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaAjustes (id: number, paciente: Ajustes): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Ajustesupdate/${id}`, paciente)
  }

  public EliminaAjustes (id: number, paciente: Ajustes): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/AjustesDelete/${id}`, paciente)
  }
}
