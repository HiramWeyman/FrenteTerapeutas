import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Maritales } from '../modules/interfaces/maritales';
import { Mental } from '../modules/interfaces/mental';


@Injectable({
  providedIn: 'root'
})
export class MaritalesService {
  private urlEndPoint = `${environment.rutaAPI}`;

  constructor(private http: HttpClient) { }

  getMarital(id:number): Observable<Maritales> {
		return this.http.get(`${this.urlEndPoint}/Marital/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaMarital(paciente: Maritales): Observable<Maritales> {
    return this.http.post<Maritales>(`${environment.rutaAPI + '/Maritalinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaMarital(id: number, paciente: Maritales): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Maritalupdate/${id}`, paciente)
  }

  public EliminaMarital(id: number, paciente: Maritales): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/MaritalDelete/${id}`, paciente)
  }
}
