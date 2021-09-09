import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Desarrollo } from '../modules/interfaces/desarrollo';

@Injectable({
  providedIn: 'root'
})
export class DesarrolloService {

  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }


  getDesarrollo(id:number): Observable<Desarrollo> {
		return this.http.get(`${this.urlEndPoint}/Desarrollo/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaDesarrollo(paciente: Desarrollo): Observable<Desarrollo> {
  console.log(paciente);
    return this.http.post<Desarrollo>(`${environment.rutaAPI + '/Desarrolloinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaDesarrollo (id: number, paciente: Desarrollo): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Desarrolloupdate/${id}`, paciente)
  }

  public EliminaDesarrollo (id: number, paciente: Desarrollo): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/DessarrolloDelete/${id}`, paciente)
  }
}
