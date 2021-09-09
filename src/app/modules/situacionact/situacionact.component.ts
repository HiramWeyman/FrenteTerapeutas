import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SituacionAct} from '../interfaces/situacionact';
import { SituacionesService } from 'src/app/services/situaciones.service';

@Component({
  selector: 'app-situacionact',
  templateUrl: './situacionact.component.html',
  styleUrls: ['./situacionact.component.css']
})
export class SituacionactComponent implements OnInit {
  pac_situacion:SituacionAct=new SituacionAct();

  constructor(
    private service:SituacionesService,
    public dialogRef:MatDialogRef<SituacionactComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    public router: Router,
  ) { }

  ngOnInit() {
    this.Situacion(this.paciente_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Situacion(paciente_id:number) {
    this.service.getSituacion(paciente_id).subscribe(
      pac_situacion =>{
        this.pac_situacion = pac_situacion
        console.log(this.pac_situacion);
      }
      );
  } 

  GuardaSituacion(situacion:SituacionAct){
    situacion.pac_situacion_pac_id=this.paciente_id;
    this.service.GuardaSituacion(situacion).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Situación Actual Registrada', `Situación actual del paciente registrada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(situacion);
   this.closeDialog();
  }

  ActualizaSituacion(id:number,situacion:SituacionAct){
  
    this.service.ActualizaSituacion(id,situacion).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Situación actual actualizada', `Situación actual del paciente actualizada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(situacion);
   this.closeDialog();
  }

  EliminarSituacion(id:number,situacion:SituacionAct){
  
    this.service.EliminarSituacion(id,situacion).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Situación actual eliminada', `Situación actual del paciente eliminada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(situacion);
   this.closeDialog();
  }

}
