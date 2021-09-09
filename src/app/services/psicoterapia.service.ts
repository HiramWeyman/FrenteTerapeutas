import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Psicoterapia } from '../modules/interfaces/psicoterapia';

@Injectable({
  providedIn: 'root'
})
export class PsicoterapiaService {

  constructor(private http: HttpClient) { }
  private urlEndPoint = `${environment.rutaAPI}`;
  getSessiones(id:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/Sessiones/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
		);
  }

  getSess(id:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/Session/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
		);
  }

  getNombre(id:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/Nombre/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
		);
  }

   CountSessiones(id:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/Countsessiones/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
		);
  } 


  GuardaSession(paciente: Psicoterapia): Observable<Psicoterapia> {
  console.log(paciente);
    return this.http.post<Psicoterapia>(`${environment.rutaAPI + '/Sessionesinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaSession (id: number, paciente: Psicoterapia): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Sessionesupdate/${id}`, paciente)
  }

  public Eliminar (id: number,paciente: Psicoterapia): Observable<any>{
    console.log(id);
    return this.http.post<any>(`${this.urlEndPoint}/SessionDelete/${id}`,paciente)
  }
  
}
