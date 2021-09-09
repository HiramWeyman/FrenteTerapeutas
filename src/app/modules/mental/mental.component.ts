import { Component, OnInit,Inject} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Mental } from '../interfaces/mental';
import { MentalService } from 'src/app/services/mental.service';

@Component({
  selector: 'app-mental',
  templateUrl: './mental.component.html',
  styleUrls: ['./mental.component.css']
})
export class MentalComponent implements OnInit {
  pac_mental:Mental=new Mental();
  paciente_id:number;
  constructor(private activatedRoute: ActivatedRoute,private service:MentalService,public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.paciente_id = parseInt(params['paciente_id']);
    })

    this.Mental(this.paciente_id);
  }

  Mental(paciente_id:number) {
    this.service.getMental(paciente_id).subscribe(
      pac_mental =>{
        this.pac_mental = pac_mental
      
      }
      );
  } 

  GuardaMental(pac_mental:Mental){
    pac_mental.pac_estado_pac_id=this.paciente_id;
    this.service.GuardaMental(pac_mental).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Estado mental registrado', `Estado mental del paciente registrado !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   
 
  }

  ActualizaMental(id:number,pac_mental:Mental){
  
    this.service.ActualizaMental(id,pac_mental).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Estado mental actualizado', `Estado mental del paciente actualizado !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
 
 
  }

  EliminaMental(id:number,pac_mental:Mental){
  
    this.service.EliminaMental(id,pac_mental).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Estado mental eliminado', `Estado mental del paciente eliminado !`, 'success');
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
