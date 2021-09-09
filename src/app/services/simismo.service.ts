import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Simismo } from '../modules/interfaces/simismo';

@Injectable({
  providedIn: 'root'
})
export class SimismoService {

  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }

  getSimismo(id:number): Observable<Simismo> {
		return this.http.get(`${this.urlEndPoint}/Simismo/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaSimismo(paciente: Simismo): Observable<Simismo> {
    return this.http.post<Simismo>(`${environment.rutaAPI + '/Simismoinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaSimismo(id: number, paciente: Simismo): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Simismoupdate/${id}`, paciente)
  }

  public EliminaSimismo(id: number, paciente: Simismo): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/SimismoDelete/${id}`, paciente)
  }

}
