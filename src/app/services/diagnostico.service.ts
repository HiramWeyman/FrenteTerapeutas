import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Diagprimario } from '../modules/interfaces/diagprimario';
import { Diagnostico } from '../modules/interfaces/diagnostico';
import { Modeloterapia } from '../modules/interfaces/modeloterapia';
import { Alta } from '../modules/interfaces/alta';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  diagnostico:Diagnostico=new Diagnostico();
  private urlEndPoint = `${environment.rutaAPI}`;
  constructor(private http: HttpClient) { }


  getDiagnostico(id:number): Observable<Diagnostico> {
		return this.http.get(`${this.urlEndPoint}/Diagnostico/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }
 // return this.http.get(`${environment.rutaAPI + '/recuperaPass?usua_usuario=' + this.usuario+'&usua_email='+this.email}`);
  getPacientes(id:number,user:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint+'/pacdiag?id='+id+'&user='+user}`).pipe(
      map((response: any) => {
        return response;
        })
		);
  }

  getPacientesCount(id:number,user:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint+'/pacdiagCount?id='+id+'&user='+user}`).pipe(
      map((response: any) => {
        return response;
        })
		);
  }

  getDiagPrimario(): Observable<Diagprimario[]> {
		return this.http.get(`${this.urlEndPoint}/Diagnosticoprimario`).pipe(
		  map(response => response as Diagprimario[])
		);
  }

  getModeloTerapeutico(): Observable<Modeloterapia[]> {
		return this.http.get(`${this.urlEndPoint}/Modeloterapia`).pipe(
		  map(response => response as Modeloterapia[])
		);
  }

  getMotivoAlta(): Observable<Alta[]> {
		return this.http.get(`${this.urlEndPoint}/Altatratamiento`).pipe(
		  map(response => response as Alta[])
		);
  }

  GuardaDiagnostico(paciente: Diagnostico): Observable<Diagnostico> {
  console.log(paciente);
    return this.http.post<Diagnostico>(`${environment.rutaAPI + '/Diagnosticoinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaDiagnostico (id: number, paciente: Diagnostico): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Diagnosticoupdate/${id}`, paciente)
  }

  public EliminaDiagnostico (id:number,paciente: Diagnostico): Observable<any>{

    return this.http.post<any>(`${this.urlEndPoint}/DiagnosticoDelete/${id}`, paciente)
  }
}
