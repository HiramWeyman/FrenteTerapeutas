import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Pagos } from '../modules/interfaces/pagos';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class PagosService {
  dataChanged = new Subject<any>();
    setDataChanged(id:number){
      let temp = this.getPago(id);
      this.dataChanged.next({...temp});    
    }

    constructor(private http: HttpClient) { }

    private urlEndPoint = `${environment.rutaAPI}`;

    private cabeceras: HttpHeaders = new HttpHeaders ({'Content-Type' : 'application/json'})

    public getPagos(): Observable<Pagos[]> {
		return this.http.get(this.urlEndPoint+'/pagos').pipe(
		  map(response => response as Pagos[])
		);
    }

    public getPago(id_aspi: any){
        return this.http.get(`${this.urlEndPoint}/dvpagos/${id_aspi}`);
    }

    public eliminarPago (id:number, pagos: any): Observable<Pagos>{
        return this.http.put<Pagos>(`${this.urlEndPoint}/pagos/${id}`, pagos, { headers: this.cabeceras})
    }

    public getBancos(){
      return this.http.get(`${this.urlEndPoint}/bancos`);
    }

    public getDocumento(id_conv: any){
      return this.http.get(`${this.urlEndPoint}/dvdocumentos/${id_conv}`);
    }

    public crear (pagos: Pagos): Observable<Pagos>{
      return this.http.post<Pagos>(`${this.urlEndPoint}/pagos/`, pagos, { headers: this.cabeceras})
    }

    public uploadFile (id: number, archivo: File): Observable<Pagos>{
      const formData = new FormData();
      formData.append('archivo', archivo)
      return this.http.put<Pagos>(`${this.urlEndPoint}/pagos/uploadFile/${id}`, formData)
    }

    public getReferencia(id_aspi: any){
      return this.http.get(`${this.urlEndPoint}/dvreferencias/${id_aspi}`);
    }
}