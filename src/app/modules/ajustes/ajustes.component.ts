import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { AjustesService } from 'src/app/services/ajustes.service';
import { Ajustes } from '../interfaces/ajustes';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {
  pac_ajustes:Ajustes=new Ajustes();

  constructor(
    public dialogRef:MatDialogRef<AjustesComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    private service:AjustesService,
    public router: Router
    ) { }

  ngOnInit() {
this.Ajustes(this.paciente_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Ajustes(paciente_id:number) {
    this.service.getAjustes(paciente_id).subscribe(
      pac_ajustes =>{
        this.pac_ajustes = pac_ajustes
    
      }
      );
  } 

  GuardaAjustes(pac_ajustes:Ajustes){
    pac_ajustes.pac_ajustes_pac_id=this.paciente_id;
    this.service.GuardaAjustes(pac_ajustes).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Ajustes sociales registrados', `Ajustes sociales del paciente registrados !`, 'success');
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

  ActualizaAjustes(id:number,pac_ajustes:Ajustes){
  
    this.service.ActualizaAjustes(id,pac_ajustes).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Ajustes sociales actualizados', `Ajustes sociales del paciente actualizados !`, 'success');
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

  EliminaAjustes(id:number,pac_ajustes:Ajustes){
  
    this.service.EliminaAjustes(id,pac_ajustes).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Ajustes sociales eliminados', `Ajustes sociales del paciente eliminados !`, 'success');
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
