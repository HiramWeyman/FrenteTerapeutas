import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatSelectionList, MatDialog, MatSelectionListChange } from '@angular/material';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { MetodoevaService } from 'src/app/services/metodoeva.service';
import { Metodoeva } from '../interfaces/metodoeva';
import Swal from 'sweetalert2';
import { Evaluacion } from '../interfaces/evaluacion';
import { AddresultadoComponent } from '../addresultado/addresultado.component';




@Component({
  selector: 'app-metodoevaluacion',
  templateUrl: './metodoevaluacion.component.html',
  styleUrls: ['./metodoevaluacion.component.css']
})
export class MetodoevaluacionComponent implements OnInit {
  catmetodo:Metodoeva[];
  current_selected: string;
  panelOpenState = false;
  evaluaciondescrip:string;
  metodos:any[] = new Array();  
  evaluacion:Evaluacion=new Evaluacion();
  eva:any[];
  constructor(
    public dialogRef:MatDialogRef<MetodoevaluacionComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    public dialog: MatDialog,
    public router: Router,
    private service:MetodoevaService
  ) { }

  ngOnInit() {
    this.MetodoEva();
    this.Evaluaciones(this.paciente_id);
    /* console.log(this.MetodoEva()); */
  }

  onSelection($event: MatSelectionListChange){
    this.current_selected = $event.option.value;
/*     if ($event.option.value.isChecked) {
      $event.option.selected = true;
      console.log($event.option.selected);
    }
    else{
      console.log($event.option.selected);
      for(var i = 0; i < this.metodos.length; i++) {
        if(this.current_selected==this.metodos[i]){
          this.metodos.splice(i,1);
        }
      }
    } */

 }

  MetodoEva() {
    this.service.getCatMetodoeva().subscribe(
      catmetodo => {
        this.catmetodo = catmetodo
      }
      );
  } 

Evaluaciones(id:number) {
    this.service.getEvaluaciones(id).subscribe(
      eva => {
        this.eva = eva
        console.log(eva);
      }
      );
  } 

  closeDialog(){
    this.dialogRef.close();
  }

  openDialogEvaluacion(paciente_id:number):void{
    const dialogRef = this.dialog.open(MetodoevaluacionComponent,{
      autoFocus: false,
      panelClass: 'trend-dialog',
      width: '900px', height: '600px'
    });
    dialogRef.componentInstance.paciente_id = paciente_id;
  }
/*   AgregarMetodo(descrip:string){
    descrip=descrip.toUpperCase();
    console.log(descrip);
  } */

  AgregarMetodo(descrip:string){
    descrip=descrip.toUpperCase();
    /* console.log(descrip);; */
    this.service.GuardaMetodoEva(descrip).subscribe(usr => {
         this.router.navigate(['/expclinico']);
        Swal.fire('Método de evaluación', `Método de evaluación registrado !`, 'success');
        this.MetodoEva();
        
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

   descrip=null;
   this.evaluaciondescrip = null;
   this.closeDialog();
   this.openDialogEvaluacion(this.paciente_id);
  }



  Agregar(){
    this.evaluacion.metodo_pac_id=this.paciente_id;
   /*  console.log(this.evaluacion); */
    this.service.Guardar(this.evaluacion).subscribe(usr => {
      this.Evaluaciones(this.paciente_id);
 /*      this.router.navigate(['/expclinico']);
     Swal.fire('Método de evaluación', `Método de evaluación registrado !`, 'success'); */
     
 },
 error => {
   console.log(error);
   Swal.fire({
     title: 'ERROR!!!',
     text: error.message,
     icon: 'error'});
 })
}

AgregarResultado(id_metodo:number,id_paciente:number):void{

  const dialogRef = this.dialog.open(AddresultadoComponent,{
    autoFocus: false,
    panelClass: 'trend-dialog',
    width: '600px', height: '400px'
  });
  dialogRef.componentInstance.paciente_id = id_paciente;
  dialogRef.componentInstance.metodo_id = id_metodo;
}

EliminaResultado(metodo_id:number,metodo_pac_id:number){
  this.service.getCountResultado(metodo_pac_id,metodo_id).subscribe(usr => {
    //this.router.navigate(['/pacientes']);
    this.Evaluaciones(this.paciente_id);
    //console.log(usr);
    if(usr>0){
    /*  console.log('si entra'); */
     this.service.EliminaResultadoGeneral(metodo_pac_id,metodo_id).subscribe(
       res=>{
       /*  console.log(res); */
         if(res===1){
          
          this.service.EliminaEvaluacion(metodo_pac_id,metodo_id).subscribe(
            x=>{
            /*   console.log(x); */
              if(x===1){
               this.Evaluaciones(this.paciente_id);
               Swal.fire('Resultado Eliminado', `El Resultado se elimino correctamente !`, 'success');
     
              }
            }
     
          );

         }
       }
     );
    
     
    // this.Evaluaciones(this.paciente_id);
     //falta elimininar registro del maestro
    }else{
      
      this.service.EliminaEvaluacion(metodo_pac_id,metodo_id).subscribe(
        x=>{
          /* console.log(x); */
          if(x===1){
           this.Evaluaciones(this.paciente_id);
           Swal.fire('Resultado Eliminado', `El Resultado se elimino correctamente !`, 'success');
 
          }
        }
 
      );
 
     // this.Evaluaciones(this.paciente_id);
    }
    this.Evaluaciones(this.paciente_id);
    //this.router.navigate(['/metodoevaluacion']);
     

  },
  error => {
    console.log(error);
    Swal.fire({
      title: 'ERROR!!!',
      text: error.message,
      icon: 'error'});
  });
  //this.Evaluaciones(this.paciente_id);
  //this.closeDialog();
}



}