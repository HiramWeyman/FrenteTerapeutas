import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Desarrollo } from '../interfaces/desarrollo';
import { DesarrolloService } from 'src/app/services/desarrollo.service';

@Component({
  selector: 'app-desarrollo',
  templateUrl: './desarrollo.component.html',
  styleUrls: ['./desarrollo.component.css']
})
export class DesarrolloComponent implements OnInit {
  pac_desarrollo:Desarrollo=new Desarrollo();

  constructor(
    public dialogRef:MatDialogRef<DesarrolloComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    private service:DesarrolloService,
    public router: Router
    ) { }

  ngOnInit() {
this.getDesarrollo(this.paciente_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getDesarrollo(paciente_id:number) {
    this.service.getDesarrollo(paciente_id).subscribe(
      pac_desarrollo =>{
        this.pac_desarrollo = pac_desarrollo
    
      }
      );
  } 

  GuardaDesarrollo(pac_desarrollo:Desarrollo){
    pac_desarrollo.pac_desarrollo_pac_id=this.paciente_id;
    this.service.GuardaDesarrollo(pac_desarrollo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Desarrollo sexual registrado', `Desarrollo sexual del paciente registrado !`, 'success');
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

  ActualizaDesarrollo(id:number,pac_desarrollo:Desarrollo){
  
    this.service.ActualizaDesarrollo(id,pac_desarrollo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Desarrollo sexual actualizado', `Desarrollo sexual del paciente actualizado !`, 'success');
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

  
  EliminaDesarrollo(id:number,pac_desarrollo:Desarrollo){
  
    this.service.EliminaDesarrollo(id,pac_desarrollo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Desarrollo sexual eliminado', `Desarrollo sexual del paciente eliminado !`, 'success');
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
