import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Historia } from '../modules/interfaces/historia';


@Injectable({
  providedIn: 'root'
})
export class HistoriaService {
  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }

  
  getHistoria(id:number): Observable<Historia> {
		return this.http.get(`${this.urlEndPoint}/Historia/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaHistoria(paciente: Historia): Observable<Historia> {
  console.log(paciente);
    return this.http.post<Historia>(`${environment.rutaAPI + '/Historiainsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaHistoria (id: number, paciente: Historia): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Historiaupdate/${id}`, paciente)
  }

  public EliminaHistoria (id: number, paciente: Historia): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/HistoriaDelete/${id}`, paciente)
  }
}
