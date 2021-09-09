import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Conv } from '../modules/interfaces/conv';
import { Estados } from '../modules/interfaces/estados';
import { Paciente } from '../modules/interfaces/paciente';
import { Catescolar } from '../modules/interfaces/catescolar';
import { Ures } from '../modules/interfaces/ures';
import { TablaUsuario } from '../modules/interfaces/tablausuario';
import { Dvaspirante } from '../modules/interfaces/dvaspirante';
import { Sterrmsj  } from '../modules/interfaces/errores';

@Injectable({
  providedIn: 'root'
})
export class AspiranteService {

  constructor(private http: HttpClient) { }

  private urlEndPoint = `${environment.rutaAPI}`;
  public urlEndPointError = '';

  getUres(): Observable<Ures[]> {
		return this.http.get(this.urlEndPoint+'/ures').pipe(
		  map(response => response as Ures[])
		);
  }
  //https://www.sipu.ujed.mx/api/api/aspirantes/
  getTablaUsuario(usuario:number): Observable<TablaUsuario[]> {
		return this.http.get(`${this.urlEndPoint}/aspirante/usuariotabla/${usuario}`).pipe(
    /*   map((response: any) => {
        //console.log(response);
        return response;
        }) */
		   map(response => response as TablaUsuario[]) 
      
		);
  }

  getUser(folio:number): Observable<Dvaspirante> {
		return this.http.get(`${this.urlEndPoint}/aspirante/${folio}`).pipe(
      map((response: any) => {
        //console.log(response);
        return response;
        }) 
		   //map(response => response as TablaUsuario[]) 
      
		);
  }

  getConvocatorias(ures:string): Observable<Conv[]> {
		return this.http.get(`${this.urlEndPoint}/conv/${ures}`).pipe(
		  map(response => response as Conv[])
		);
  }

  getEscolaridad(): Observable<Catescolar[]> {
		return this.http.get(this.urlEndPoint+'/catescolar').pipe(
		  map(response => response as Catescolar[])
		);
  }

  getEstados(): Observable<Estados[]> {
		return this.http.get(this.urlEndPoint+'/edomun').pipe(
		  map(response => response as Estados[])
		);
  }

  getMunicipios(id:string): Observable<any[]> {
  return this.http.get(`${this.urlEndPoint}/edomun/municipio/${id}`).pipe(
		  map(response => response as any[])
		);
  }

  getUsuario(paciente: Paciente) {
/*     console.log(paciente);
  return this.http.post(`${this.urlEndPoint}/aspirante/usuario/`,paciente).pipe(
		  map(response => response as Paciente[])
		); */
  }

  create(paciente: Paciente): Observable<Paciente> {
  
    return this.http.post<Paciente>(`${environment.rutaAPI + '/aspirante'}`, paciente).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    );
  } 

  Update(aspirante: Dvaspirante,id:number): Observable<Dvaspirante> {
  console.log(id);
  return this.http.put<Dvaspirante>(`${this.urlEndPoint}/aspirante/${id}`, aspirante);
  /*   return this.http.put<Dvaspirante>(`${this.urlEndPoint}/aspirante/${id}`, aspirante).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
    ); */
  } 


  getError(cerr_refer: string): Observable<Sterrmsj> {
    return this.http.get<Sterrmsj>(`${this.urlEndPointError}/sterrmsj/${cerr_refer}`)
  }
}
