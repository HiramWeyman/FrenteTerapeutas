import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Simismo } from '../interfaces/simismo';
import { SimismoService } from 'src/app/services/simismo.service';

@Component({
  selector: 'app-simismo',
  templateUrl: './simismo.component.html',
  styleUrls: ['./simismo.component.css']
})
export class SimismoComponent implements OnInit {
  pac_simismo:Simismo=new Simismo();
  paciente_id:number;
  constructor(private activatedRoute: ActivatedRoute,private service:SimismoService,public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.paciente_id = parseInt(params['paciente_id']);
     
    })
    this.Simismo(this.paciente_id);
  }

  Simismo(paciente_id:number) {
    this.service.getSimismo(paciente_id).subscribe(
      pac_simismo =>{
        this.pac_simismo = pac_simismo
      
      }
      );
  } 

  GuardaSimismo(pac_simismo:Simismo){
    pac_simismo.pac_simismo_pac_id=this.paciente_id;
    this.service.GuardaSimismo(pac_simismo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Descripción de sí mismo registrado', `Descripción de sí mismo del paciente registrado !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   
 
  }

  ActualizaSimismo(id:number,pac_simismo:Simismo){
  
    this.service.ActualizaSimismo(id,pac_simismo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Descripción de sí mismo actualizado', `Descripción de sí mismo del paciente actualizado !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
 
 
  }

  EliminaSimismo(id:number,pac_simismo:Simismo){
  
    this.service.EliminaSimismo(id,pac_simismo).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Descripción de sí mismo eliminada', `Descripción de sí mismo del paciente eliminada !`, 'success');
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
