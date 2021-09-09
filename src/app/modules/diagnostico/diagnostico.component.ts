import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { Diagprimario } from '../interfaces/diagprimario';
import { Diagnostico } from '../interfaces/diagnostico';
import { Modeloterapia } from '../interfaces/modeloterapia';
import { Alta } from '../interfaces/alta';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  pac_diag_prim:Diagprimario[];
  pac_diagnostico:Diagnostico=new Diagnostico();
  pac_diag_mod:Modeloterapia[];
  pac_diag_alta:Alta[];
  constructor(
    private service:DiagnosticoService,
    public dialogRef:MatDialogRef<DiagnosticoComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    @Inject(MAT_DIALOG_DATA) public parametro:number,
    public router: Router,
  ) { }

  ngOnInit() {
    this.DiagPrimario();
    this.ModeloTerapeutico();
    this.MotivoAlta();
    this.Diagnostico(this.paciente_id);
   
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Diagnostico(paciente_id:number) {
    this.service.getDiagnostico(paciente_id).subscribe(
      pac_diagnostico =>{
        this.pac_diagnostico = pac_diagnostico
        this.pac_diagnostico.pac_diag_fec_seguimiento=this.pac_diagnostico.pac_diag_fec_seguimiento.substr(0,10);
        //console.log(this.pac_diagnostico.pac_diag_fec_seguimiento);
      }
      );
  } 

  DiagPrimario() {
    this.service.getDiagPrimario().subscribe(
      pac_diag_prim => this.pac_diag_prim = pac_diag_prim
      );
  } 

  ModeloTerapeutico() {
    this.service.getModeloTerapeutico().subscribe(
      pac_diag_mod => this.pac_diag_mod = pac_diag_mod
      );
  } 

  MotivoAlta() {
    this.service.getMotivoAlta().subscribe(
      pac_diag_alta => this.pac_diag_alta = pac_diag_alta
      );
  } 

  GuardaDiagnostico(pac_diagnostico:Diagnostico){
    pac_diagnostico.pac_diag_pac_id=this.paciente_id;
    this.service.GuardaDiagnostico(pac_diagnostico).subscribe(usr => {
      if (usr){

        if(this.parametro===1){
          this.router.navigate(['/pacientes']);
          Swal.fire('Diagnóstico registrado', `Diagnóstico del paciente registrado !`, 'success');
        }
        else{
          this.router.navigate(['/expclinico']);
          Swal.fire('Diagnóstico registrado', `Diagnóstico del paciente registrado !`, 'success');
        }
      }
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

   this.closeDialog();
  }

  ActualizaDiagnostico(id:number,pac_diagnostico:Diagnostico){
  
    this.service.ActualizaDiagnostico(id,pac_diagnostico).subscribe(usr => {
      if (usr){

        if(this.parametro===1){
          this.router.navigate(['/pacientes']);
          Swal.fire('Diagnóstico actualizado', `Diagnostico del paciente actualizado !`, 'success');
        }
        else{
          this.router.navigate(['/expclinico']);
          Swal.fire('Diagnóstico actualizado', `Diagnostico del paciente actualizado !`, 'success');
        }
      }
        
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

   this.closeDialog();
  }

  EliminaDiagnostico(id:number,pac_diagnostico:Diagnostico){
  
    this.service.EliminaDiagnostico(id,pac_diagnostico).subscribe(usr => {
      if(this.parametro===1){
        this.router.navigate(['/pacientes']);
        Swal.fire('Diagnóstico eliminado', `Diagnostico del paciente eliminado !`, 'success');
      }
      else{
        this.router.navigate(['/expclinico']);
        Swal.fire('Diagnóstico eliminado', `Diagnostico del paciente eliminado !`, 'success');
      }
        
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

   this.closeDialog();
  }
  

}
