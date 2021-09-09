import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {MatDialogModule} from '@angular/material/dialog';
import{recuperaPass} from './recuperaPass';
import { RecuperarService } from '../../services/recuperar.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {
  public recupera: recuperaPass = new recuperaPass();
  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>,private rec: RecuperarService,private router: Router ) { }
  datos:any;
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

 

  enviarPass() {
    if (this.recupera.usua_usuario === ''|| this.recupera.usua_email === '') {
      swal.fire('Datos incorrectos', `Su usuario o email son incorrectos`, 'error');
    } else {
      this.rec.getUsuariosEmail(this.recupera).subscribe(
        dato => this.datos = dato
        );
        console.log(this.datos);
        if(this.datos){
          console.log(this.datos);
          swal.fire('Password enviado', `Su password se envio a su correo registrado`, 'success');
        }
        else{
          swal.fire('Datos incorrectos', `Su usuario o email son incorrectos o no existen`, 'error');
        }
    }
 
   }
}
