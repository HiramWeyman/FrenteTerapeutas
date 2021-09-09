import { Component, OnInit,Inject} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Escolar } from '../interfaces/escolaridad';
import { EscolaridadService } from 'src/app/services/escolaridad.service';

@Component({
  selector: 'app-escolaridad',
  templateUrl: './escolaridad.component.html',
  styleUrls: ['./escolaridad.component.css']
})
export class EscolaridadComponent implements OnInit {
  pac_escolar:Escolar=new Escolar();
  paciente_id:number;
  constructor(private activatedRoute: ActivatedRoute,private service:EscolaridadService,public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.paciente_id = parseInt(params['paciente_id']);
    })
    this.Escolar(this.paciente_id);
  }

  Escolar(paciente_id:number) {
    this.service.getEscolar(paciente_id).subscribe(
      pac_escolar =>{
        this.pac_escolar = pac_escolar
      
      }
      );
  } 

  GuardaEscolar(pac_escolar:Escolar){
    pac_escolar.pac_escolaridad_pac_id=this.paciente_id;
    this.service.GuardaEscolar(pac_escolar).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Escolaridad registrada', `Escolaridad del paciente registrada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   
 
  }

  ActualizaEscolar(id:number,pac_escolar:Escolar){
  
    this.service.ActualizaEscolar(id,pac_escolar).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Escolaridad actualizada', `Escolaridad del paciente actualizada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
 
 
  }

  EliminaEscolar(id:number,pac_escolar:Escolar){
  
    this.service.EliminaEscolar(id,pac_escolar).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Escolaridad eliminada', `Escolaridad del paciente eliminada !`, 'success');
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
