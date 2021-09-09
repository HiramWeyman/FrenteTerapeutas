import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SituacionAct} from '../interfaces/situacionact';
import { ActivatedRoute } from '@angular/router';
import { Constelacion } from '../interfaces/constelacion';
import { ConstelacionService } from 'src/app/services/constelacion.service';

@Component({
  selector: 'app-constefam',
  templateUrl: './constefam.component.html',
  styleUrls: ['./constefam.component.css']
})
export class ConstefamComponent implements OnInit {
  pac_coste:Constelacion=new Constelacion();
  paciente_id:number;
  constructor(private activatedRoute: ActivatedRoute,private service:ConstelacionService,public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.paciente_id = parseInt(params['paciente_id']);
     
    })

    this.Constelacion(this.paciente_id);
    
  }

  Constelacion(paciente_id:number) {
    this.service.getConstelacion(paciente_id).subscribe(
      pac_coste =>{
        this.pac_coste = pac_coste
        console.log(this.pac_coste);
      }
      );
  } 

  GuardaConstelacion(constelacion:Constelacion){
    constelacion.pac_conste_paciene_id=this.paciente_id;
    console.log(this.paciente_id);
    this.service.GuardaConstelacion(constelacion).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Constelación familiar Registrada', `Constelación familiar del paciente registrada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   
 
  }

  ActualizaConstelacion(id:number,constelacion:Constelacion){
  
    this.service.ActualizaConstelacion(id,constelacion).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Constelación familiar actualizada', `Constelación familiar del paciente actualizada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
 
 
  }

  EliminaConstelacion(id:number,constelacion:Constelacion){
  
    this.service.EliminaConstelacion(id,constelacion).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Constelación familiar eliminada', `Constelación familiar del paciente eliminada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
 
 
  }

}
