import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { DiversionesService } from 'src/app/services/diversiones.service';
import { Diversiones } from '../interfaces/diversiones';

@Component({
  selector: 'app-diversiones',
  templateUrl: './diversiones.component.html',
  styleUrls: ['./diversiones.component.css']
})
export class DiversionesComponent implements OnInit {
  pac_div:Diversiones=new Diversiones();

  constructor(
    public dialogRef:MatDialogRef<DiversionesComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    private service:DiversionesService,
    public router: Router
    ) { }

  ngOnInit() {
this.Diversion(this.paciente_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Diversion(paciente_id:number) {
    this.service.getDiversion(paciente_id).subscribe(
      pac_div =>{
        this.pac_div = pac_div
    
      }
      );
  } 

  GuardaDiversion(pac_div:Diversiones){
    pac_div.pac_diversion_pac_id=this.paciente_id;
    this.service.GuardaDiversion(pac_div).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Diversiones e intereses registrados', `Diversiones e intereses del paciente registrados !`, 'success');
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

  ActualizaDiversion(id:number,pac_div:Diversiones){
  
    this.service.ActualizaDiversion(id,pac_div).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Diversiones e intereses actualizados', `Diversiones e intereses del paciente actualizados !`, 'success');
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


  EliminaDiversion(id:number,pac_div:Diversiones){
  
    this.service.EliminaDiversion(id,pac_div).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Diversiones e intereses eliminados', `Diversiones e intereses del paciente eliminados !`, 'success');
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
