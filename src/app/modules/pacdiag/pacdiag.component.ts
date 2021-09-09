import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { Diagprimario } from '../interfaces/diagprimario';

@Component({
  selector: 'app-pacdiag',
  templateUrl: './pacdiag.component.html',
  styleUrls: ['./pacdiag.component.css']
})
export class PacdiagComponent implements OnInit {
  pac_diag_prim:Diagprimario[];
  diagnostico:any;
  user:number;
  paciente:any;
  pacientecount:any;
  constructor( private service:DiagnosticoService,) { }

  ngOnInit() {
    this.user=parseInt(sessionStorage.getItem('Login'));
    this.DiagPrimario();
  }

  DiagPrimario() {
    this.service.getDiagPrimario().subscribe(
      pac_diag_prim => this.pac_diag_prim = pac_diag_prim
      );
  } 

  Pacientes(id:number){

    this.service.getPacientes(id,this.user).subscribe(
      paciente => {
        this.paciente = paciente
        console.log(this.paciente);
      }
      );
  }

  PacientesCount(id:number){

    this.service.getPacientesCount(id,this.user).subscribe(
      pacientecount => {
        this.pacientecount = pacientecount
        console.log(this.pacientecount);
      }
      );
  }

}
