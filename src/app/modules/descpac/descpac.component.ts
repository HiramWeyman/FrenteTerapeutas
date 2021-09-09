import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import { PacientesService } from 'src/app/services/pacientes.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {PacienteDescrip} from '../interfaces/pacientedescrip';
@Component({
  selector: 'app-descpac',
  templateUrl: './descpac.component.html',
  styleUrls: ['./descpac.component.css']
})
export class DescpacComponent implements OnInit {
  pac_desc:PacienteDescrip=new PacienteDescrip();

  constructor(
    private service:PacientesService,
    public dialogRef:MatDialogRef<DescpacComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    public router: Router,
  ) { }

  ngOnInit() {
   this.Descripcion(this.paciente_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Descripcion(paciente_id:number) {
    this.service.getDescripcion(paciente_id).subscribe(
      pac_desc =>{
        this.pac_desc = pac_desc
        console.log(this.pac_desc);
      }
      );
  } 

  GuardarDescrip(pacientedesc:PacienteDescrip){
    pacientedesc.pac_paciente_id=this.paciente_id;
    this.service.GuardaDescripcion(pacientedesc).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Descripción Registrada', `Descripción del paciente registrada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(pacientedesc);
   this.closeDialog();
  }

  ActualizarDescrip(id:number,pacientedesc:PacienteDescrip){
  
    this.service.ActualizaDescripcion(id,pacientedesc).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Descripción Actualizada', `Descripción del paciente actualizada !`, 'success');
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


  EliminarDescrip(id:number,pacientedesc:PacienteDescrip){
  
    this.service.EliminaraDescripcion(id,pacientedesc).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Descripción eliminada', `Descripción del paciente eliminada !`, 'success');
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
