import { Component, OnInit,Inject} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Recuerdos } from '../interfaces/recuerdos';
import { RecuerdosService } from 'src/app/services/recuerdos.service';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';

@Component({
  selector: 'app-recuerdos',
  templateUrl: './recuerdos.component.html',
  styleUrls: ['./recuerdos.component.css']
})
export class RecuerdosComponent implements OnInit {
  pac_recuerdo:Recuerdos=new Recuerdos();

  constructor(
    private activatedRoute: ActivatedRoute,
    private service:RecuerdosService,
    public router: Router,
    public dialogRef:MatDialogRef<RecuerdosComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,) { }

  ngOnInit() {
     this.Recuerdos(this.paciente_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Recuerdos(paciente_id:number) {
    this.service.getRecuerdos(paciente_id).subscribe(
      pac_recuerdo =>{
        this.pac_recuerdo = pac_recuerdo
        console.log(this.pac_recuerdo);
      }
      );
  } 

  GuardaRecuerdos(pac_recuerdo:Recuerdos){
    pac_recuerdo.pac_recuerdos_pac_id=this.paciente_id;
    this.service.GuardaRecuerdos(pac_recuerdo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Recuerdos tempranos registrados', `Recuerdos tempranos del paciente registrados !`, 'success');
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

  ActualizaRecuerdos(id:number,pac_recuerdo:Recuerdos){
  
    this.service.ActualizaRecuerdos(id,pac_recuerdo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Recuerdos tempranos actualizados', `Recuerdos tempranos del paciente actualizados !`, 'success');
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

EliminaRecuerdos(id:number,pac_recuerdo:Recuerdos){
  
    this.service.EliminaRecuerdos(id,pac_recuerdo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Recuerdos tempranos eliminados', `Recuerdos tempranos del paciente eliminados !`, 'success');
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
