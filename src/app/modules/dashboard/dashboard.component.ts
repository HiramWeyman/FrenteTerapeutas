import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrarService } from '../../services/registrar.service';
import { Usuarios } from '../../shared/registrar/usuarios';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
title = 'Tour of Heroes';
  today: number = Date.now();

/*   usuarios:Usuarios[]; */


  count: Number;
  user_name:string;
  constructor( private _reg: RegistrarService) { }

  ngOnInit() {
    window.scroll(0, 0);
    //this.nombre_user='xxxx';
    this.user_name=sessionStorage.getItem('Nombre').toString();
    console.log( this.user_name);
    /* this._reg.getUserName(sessionStorage.getItem('Login')).subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        //console.log(this.usuarios);
      }
    ) */

   }

}
