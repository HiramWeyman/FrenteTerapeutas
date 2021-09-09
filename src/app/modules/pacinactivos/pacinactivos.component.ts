import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';
import { Paciente } from '../interfaces/paciente';
import { TablaUsuario } from '../interfaces/tablausuario';

@Component({
  selector: 'app-pacinactivos',
  templateUrl: './pacinactivos.component.html',
  styleUrls: ['./pacinactivos.component.css']
})
export class PacinactivosComponent implements OnInit {
 
 
  usuario: TablaUsuario[];
  public show = false;
  datos: TablaUsuario[] = [];
  message:any;
  pacientes:any;
  date=new Date();
  fecNac: any;
  fecIng: any;
  nom:string;
  constructor(private service:PacientesService,public router: Router) { }
  user:number;
  tablaUsers: TablaUsuario[];
  ngOnInit() {
    this.user=parseInt(sessionStorage.getItem('Login'));
    this.TablaPacientes( this.user);
    var input = document.getElementById("search");
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("Btn").click();
      }
    });
  }

  TablaPacientes(id:number) {
    console.log(id);
    this.service.getPacientesInactivos(id).subscribe(
      pacientes => this.pacientes = pacientes
      );
  } 

  TablaPacientesNombre(nom:string) {
    if(nom){
      nom=nom.toLocaleUpperCase();
      console.log(nom);
      this.service.getPacientesNombreInactivos(nom).subscribe(
        pac => {
          this.pacientes = pac
          
        }
        );
    }
    else{
      this.ngOnInit();
    }

  } 

ActivarPaciente(paciente_id:number,paciente:Paciente){
  
    this.service.ActivarPaciente(paciente_id,paciente).subscribe(usr => {

      if(usr){
        this.router.navigate(['/pacinactivos']);
        this.ngOnInit();
        Swal.fire('Paciente Activado', `Datos del paciente activados !`, 'success');
      }
      
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

  }
}
