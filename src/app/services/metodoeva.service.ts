import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Metodoeva } from '../modules/interfaces/metodoeva';
import { Evaluacion } from '../modules/interfaces/evaluacion';
import { Resultadoeva } from '../modules/interfaces/resultadoeva';

@Injectable({
  providedIn: 'root'
})
export class MetodoevaService {
  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }
  reseva:Resultadoeva=new Resultadoeva();
  getCatMetodoeva(): Observable<Metodoeva[]> {
		return this.http.get(`${this.urlEndPoint}/Metodoeva`).pipe(
		  map(response => response as Metodoeva[])
		);
  }

  getEvaluaciones(id:number): Observable<any[]> {
		return this.http.get(`${this.urlEndPoint}/Evaluacion/${id}`).pipe(
		  map(response => response as any[])
		);
  }

  getResultado(paciente_id:number,metodo_id:number): Observable<any> {
		return this.http.get(`${environment.rutaAPI + '/ResultadoEva?paciente_id='+paciente_id+'&metodo_id='+metodo_id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }

  getCountResultado(paciente_id:number,metodo_id:number):any {
		return this.http.get(`${environment.rutaAPI + '/CountResultado?paciente_id='+paciente_id+'&metodo_id='+metodo_id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaMetodoEva(descripcion: string) {
    console.log(descripcion);
      return this.http.post(`${environment.rutaAPI + '/DescEva?descripcion='+descripcion}`, descripcion).pipe(
        map((response: any) => {
          console.log(response);
          return response;
          })
      );
    } 


    Guardar(evaluacion: Evaluacion): Observable<Evaluacion> {
      console.log(evaluacion);
        return this.http.post<Evaluacion>(`${environment.rutaAPI + '/InsertEva'}`, evaluacion).pipe(
          map((response: any) => {
            console.log(response);
            return response;
            })
        );
      } 

      GuardarResultado(resultado:Resultadoeva): Observable<Resultadoeva>{
        console.log(resultado);
        return this.http.post<Resultadoeva>(`${environment.rutaAPI + '/InsertResultado'}`, resultado).pipe(
          map((response: any) => {
            console.log(response);
            return response;
            })
        );
      }

      ActualizaResultado(id: number,resultado:Resultadoeva): Observable<Resultadoeva>{
        console.log(resultado);
        return this.http.post<Resultadoeva>(`${environment.rutaAPI}/UpdateResultado/${id}`, resultado).pipe(
          map((response: any) => {
            console.log(response);
            return response;
            })
        );
      }

     /*  public ActualizaResultado (id: number, resultado: Resultadoeva): Observable<any>{
        return this.http.post<any>(`${this.urlEndPoint}/UpdateResultado/${id}`, resultado)
      } */

    /*   public EliminaResultado (id: number): Observable<any>{
        return this.http.delete<any>(`${this.urlEndPoint}/DeleteResultado/${id}`)
      } */

      public EliminaResultado (id: number,resultado:Resultadoeva): Observable<any>{
        return this.http.post<any>(`${this.urlEndPoint}/DeleteResultado/${id}`,resultado)
      }

      public EliminaResultadoGeneral (paciente_id:number,metodo_id:number): Observable<any>{

        return this.http.post<any>(`${environment.rutaAPI + '/DeleteRes?paciente_id='+paciente_id+'&metodo_id='+metodo_id}`,this.reseva)
      }

      public EliminaEvaluacion (paciente_id:number,metodo_id:number): Observable<any>{

        return this.http.post<any>(`${environment.rutaAPI + '/DeleteEvaluacion?paciente_id='+paciente_id+'&metodo_id='+metodo_id}`,this.reseva)
      }
}
