import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Escolar } from '../modules/interfaces/escolaridad';
import { Estados } from '../modules/interfaces/estados';
import { Municipios } from '../modules/interfaces/municipios';
import { Edocivil } from '../modules/interfaces/edocivil';
import { Estatus } from '../modules/interfaces/estatus';
import { Modalidad } from '../modules/interfaces/modalidad';
import { Genero } from '../modules/interfaces/genero';
import { Paciente } from '../modules/interfaces/paciente';
import { PacienteDescrip } from '../modules/interfaces/pacientedescrip';



@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private urlEndPoint = `${environment.rutaAPI}`;
/*   private cabeceras: HttpHeaders = new HttpHeaders ({'Content-Type' : 'application/json'}) */
  constructor(private http: HttpClient) { }


  getEscolaridad(): Observable<Escolar[]> {
		return this.http.get(`${this.urlEndPoint}/escolaridad`).pipe(
		  map(response => response as Escolar[])
		);
  }

  getEstados(): Observable<Estados[]> {
		return this.http.get(`${this.urlEndPoint}/estado`).pipe(
		  map(response => response as Estados[])
		);
  }

  getMunicipios(cve_edo:string): Observable<Municipios[]> {
    //console.log(cve_edo);
		return this.http.get(`${this.urlEndPoint}/municipio/${cve_edo}`).pipe(
		  map(response => response as Municipios[])
		);
  }

  getMunicipiosRes(cve_edo:string): Observable<Municipios[]> {
    console.log(cve_edo);
		return this.http.get(`${this.urlEndPoint}/municipio/${cve_edo}`).pipe(
		  map(response => response as Municipios[])
		);
  }

  getEstadoCivil(): Observable<Edocivil[]> {
		return this.http.get(`${this.urlEndPoint}/edocivil`).pipe(
		  map(response => response as Edocivil[])
		);
  }

  getEstatus(): Observable<Estatus[]> {
		return this.http.get(`${this.urlEndPoint}/estatus`).pipe(
		  map(response => response as Estatus[])
		);
  }

  getModalidad(): Observable<Modalidad[]> {
		return this.http.get(`${this.urlEndPoint}/modalidad`).pipe(
		  map(response => response as Modalidad[])
		);
  }

  getGenero(): Observable<Genero[]> {
		return this.http.get(`${this.urlEndPoint}/genero`).pipe(
		  map(response => response as Genero[])
		);
  }

  getPacientes(id:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/pacientes/${id}`).pipe(
      map((response: any) => {
        return response;
        })
		);
  }


  getPacientesInactivos(id:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/PacientesInactivos/${id}`).pipe(
      map((response: any) => {
        return response;
        })
		);
  }
  getPacientesNombre(nom:string): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/NombrePaciente/${nom}`).pipe(
      map((response: any) => {
        /* console.log(response); */
        return response;
        })
		);
  }

  getPacientesNombreInactivos(nom:string): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/NombrePacienteInactivo/${nom}`).pipe(
      map((response: any) => {
        /* console.log(response); */
        return response;
        })
		);
  }

  getPacientesDet(id:number): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/pacienteDet/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
		);
  }



  
  getPaciente(id:number): Observable<Paciente> {
		return this.http.get(`${this.urlEndPoint}/paciente/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  create(paciente: Paciente): Observable<Paciente> {
  
    return this.http.post<Paciente>(`${environment.rutaAPI + '/Pacinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 

  


/*   
  Update(paciente: Paciente,id:number): Observable<Paciente> {
  console.log(id);
  console.log(paciente);
  return this.http.put<Paciente>(`${environment.rutaAPI}/Pacupdate/${id}`, paciente,{headers:this.cabeceras}).pipe(
    map((response: any) => {
      console.log(response);
      return response;
      })
  );

  }   */

  public Update (id: number, paciente: Paciente): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Pacupdate/${id}`, paciente)
  }

  public ActivarPaciente (id: number, paciente: Paciente): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/ActivarPaciente/${id}`, paciente)
  }

  public DesactivarPaciente (id: number, paciente: Paciente): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/DesactivarPaciente/${id}`, paciente)
  }

  getDescripcion(id:number): Observable<PacienteDescrip> {
		return this.http.get(`${this.urlEndPoint}/pacdescripcion/${id}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }


  GuardaDescripcion(paciente: PacienteDescrip): Observable<PacienteDescrip> {
  console.log(paciente);
    return this.http.post<PacienteDescrip>(`${environment.rutaAPI + '/Descinsert'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 


  public ActualizaDescripcion (id: number, paciente: PacienteDescrip): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/Descupdate/${id}`, paciente)
  }

  public EliminaraDescripcion (id: number, paciente: PacienteDescrip): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/DescDelete/${id}`, paciente)
  }

}
