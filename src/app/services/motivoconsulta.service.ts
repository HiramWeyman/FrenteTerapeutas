import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {MotivoCons} from '../modules/interfaces/motivoconsulta';

@Injectable({
  providedIn: 'root'
})
export class MotivoconsultaService {
  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }

  getConsulta(id:number): Observable<MotivoCons> {
		return this.http.get(`${this.urlEndPoint}/Consulta/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaConsulta(paciente: MotivoCons): Observable<MotivoCons> {
  console.log(paciente);
    return this.http.post<MotivoCons>(`${environment.rutaAPI + '/Consultainsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaConsulta (id: number, paciente: MotivoCons): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Consultaupdate/${id}`, paciente)
  }

  public EliminarConsulta (id: number, paciente: MotivoCons): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/ConsultaDelete/${id}`, paciente)
  }
}
