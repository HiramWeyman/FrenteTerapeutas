import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import { PacientesService } from 'src/app/services/pacientes.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MotivoCons} from '../interfaces/motivoconsulta';
import { MotivoconsultaService } from 'src/app/services/motivoconsulta.service';

@Component({
  selector: 'app-motivocons',
  templateUrl: './motivocons.component.html',
  styleUrls: ['./motivocons.component.css']
})
export class MotivoconsComponent implements OnInit {
  pac_cons:MotivoCons=new MotivoCons();
  constructor(
    private service:MotivoconsultaService,
    public dialogRef:MatDialogRef<MotivoconsComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    public router: Router,
  ) { }

  ngOnInit() {
    this.Consulta(this.paciente_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Consulta(paciente_id:number) {
    this.service.getConsulta(paciente_id).subscribe(
      pac_cons =>{
        this.pac_cons = pac_cons
        console.log(this.pac_cons);
      }
      );
  } 

  GuardarConsulta(motivocons:MotivoCons){
    motivocons.pac_cons_pac_id=this.paciente_id;
    this.service.GuardaConsulta(motivocons).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Motivo de consulta Registrado', `Motivo de consulta del paciente registrado !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(motivocons);
   this.closeDialog();
  }

  ActualizarConsulta(id:number,motivocons:MotivoCons){
  
    this.service.ActualizaConsulta(id,motivocons).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Motivo de consulta actualizada', `Motivo de consulta del paciente actualizada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(motivocons);
   this.closeDialog();
  }


  EliminarConsulta(id:number,motivocons:MotivoCons){
  
    this.service.EliminarConsulta(id,motivocons).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Motivo de consulta eliminada', `Motivo de consulta del paciente eliminada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(motivocons);
   this.closeDialog();
  }

}
