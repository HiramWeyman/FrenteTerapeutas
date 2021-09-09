import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, } from '../../environments/environment';

import { Usuarios } from '../shared/registrar/usuarios';
import { Password } from '../modules/interfaces/password';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  public urlEndPoint = `${environment.rutaAPI}`;

  constructor( private http: HttpClient ) { }



  create(usuario: Usuarios): Observable<Usuarios> {
    console.log(usuario);
    //const user = sessionStorage.Login;
    usuario.usuario_tipo=2;
    return this.http.post<Usuarios>(`${environment.rutaAPI + '/usuarios'}`, usuario);
  }

  CountUser(usuario: Usuarios): Observable<any> {
		return this.http.get(`${this.urlEndPoint}/Countmail/${usuario.usuario_correo}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
        })
		);
  } 

  cambiarPassword(usuario: Password): Observable<Password> {
    console.log(usuario);
    return this.http.post<Password>(`${environment.rutaAPI + '/password'}`, usuario);
  }

}
