import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatSelectionList, MatDialog, MatSelectionListChange } from '@angular/material';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { MetodoevaService } from 'src/app/services/metodoeva.service';
import { Metodoeva } from '../interfaces/metodoeva';
import Swal from 'sweetalert2';
import { Resultadoeva } from '../interfaces/resultadoeva';

@Component({
  selector: 'app-addresultado',
  templateUrl: './addresultado.component.html',
  styleUrls: ['./addresultado.component.css']
})
export class AddresultadoComponent implements OnInit {
  resultado:Resultadoeva=new Resultadoeva();
  constructor(
    public dialogRef:MatDialogRef<AddresultadoComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    @Inject(MAT_DIALOG_DATA) public metodo_id:number,
    public dialog: MatDialog,
    public router: Router,
    private service:MetodoevaService
  ) { }

  ngOnInit() {
    this.Resultado(this.paciente_id,this.metodo_id);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  Resultado(paciente_id:number,metodo_id:number) {
    this.service.getResultado(paciente_id,metodo_id).subscribe(
      resultado =>{
        this.resultado = resultado
  
      }
      );
  } 


  GuardarResultado(){
    this.resultado.evaluacion_pac_id=this.paciente_id;
    this.resultado.evaluacion_metodo=this.metodo_id;

    this.service.GuardarResultado(this.resultado).subscribe(usr => {
/*       this.Evaluaciones(this.paciente_id);
 */ /*      this.router.navigate(['/expclinico']);
      */
 Swal.fire('Resultado de evaluación', `Resultado de evaluación registrado !`, 'success');
 this.closeDialog();
     
 },
 error => {
   console.log(error);
   Swal.fire({
     title: 'ERROR!!!',
     text: error.message,
     icon: 'error'});
 })
}

ActualizaResultado(id:number,resultado:Resultadoeva){
  
  this.service.ActualizaResultado(id,resultado).subscribe(usr => {
    //this.router.navigate(['/pacientes']);
      Swal.fire('Resultado actualizado', `El Resultado se actualizo correctamente !`, 'success');
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

EliminaResultado(id:number,resultado:Resultadoeva){
  this.service.EliminaResultado(id,resultado).subscribe(usr => {
    //this.router.navigate(['/pacientes']);
      Swal.fire('Resultado Eliminado', `El Resultado se elimino correctamente !`, 'success');
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
