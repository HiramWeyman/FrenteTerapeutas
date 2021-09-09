import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Diversiones } from '../modules/interfaces/diversiones';

@Injectable({
  providedIn: 'root'
})
export class DiversionesService {

  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }


  getDiversion(id:number): Observable<Diversiones> {
		return this.http.get(`${this.urlEndPoint}/Diversion/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaDiversion(paciente: Diversiones): Observable<Diversiones> {
  console.log(paciente);
    return this.http.post<Diversiones>(`${environment.rutaAPI + '/Diversioninsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaDiversion (id: number, paciente: Diversiones): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Diversionupdate/${id}`, paciente)
  }

  public EliminaDiversion (id: number, paciente: Diversiones): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/DiversionDelete/${id}`, paciente)
  }
}
