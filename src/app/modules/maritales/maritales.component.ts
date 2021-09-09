import { Component, OnInit,Inject} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Maritales } from '../interfaces/maritales';
import { MaritalesService } from 'src/app/services/maritales.service';


@Component({
  selector: 'app-maritales',
  templateUrl: './maritales.component.html',
  styleUrls: ['./maritales.component.css']
})
export class MaritalesComponent implements OnInit {
  pac_marital:Maritales=new Maritales();
  paciente_id:number;
  constructor(private activatedRoute: ActivatedRoute,private service:MaritalesService,public router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.paciente_id = parseInt(params['paciente_id']);
     
    })
    this.Maritales(this.paciente_id);
  }

  Maritales(paciente_id:number) {
    this.service.getMarital(paciente_id).subscribe(
      pac_marital =>{
        this.pac_marital = pac_marital
      
      }
      );
  } 

  GuardaMaritales(pac_marital:Maritales){
    pac_marital.pac_maritales_pac_id=this.paciente_id;
    this.service.GuardaMarital(pac_marital).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Datos maritales registrados', `Datos maritales del paciente registrados !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   
 
  }

  ActualizaMaritales(id:number,pac_marital:Maritales){
  
    this.service.ActualizaMarital(id,pac_marital).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Datos maritales actualizada', `Datos maritales del paciente actualizada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
 
 
  }

 EliminaMaritales(id:number,pac_marital:Maritales){
  
    this.service.EliminaMarital(id,pac_marital).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Datos maritales eliminados', `Datos maritales del paciente eliminados !`, 'success');
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
