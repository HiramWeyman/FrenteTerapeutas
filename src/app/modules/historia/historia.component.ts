import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Historia } from '../interfaces/historia';
import { HistoriaService } from 'src/app/services/historia.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {
  pac_historia:Historia=new Historia();
  paciente_id:number;
  constructor(private activatedRoute: ActivatedRoute,private service:HistoriaService,public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.paciente_id = parseInt(params['paciente_id']);
    })

    this.Historia(this.paciente_id);
  }

  Historia(paciente_id:number) {
    this.service.getHistoria(paciente_id).subscribe(
      pac_historia =>{
        this.pac_historia = pac_historia
      
      }
      );
  } 

  GuardaHistoria(pac_historia:Historia){
    pac_historia.pac_hist_pac_id=this.paciente_id;
    console.log(this.paciente_id);
    this.service.GuardaHistoria(pac_historia).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Historia personal registrada', `Historia personal del paciente registrada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   
 
  }

  ActualizaHistoria(id:number,pac_historia:Historia){
  
    this.service.ActualizaHistoria(id,pac_historia).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Historia personal actualizada', `Historia personal del paciente actualizada !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
 
 
  }

  
  EliminaHistoria(id:number,pac_historia:Historia){
  
    this.service.EliminaHistoria(id,pac_historia).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Historia personal eliminada', `Historia personal del paciente eliminada !`, 'success');
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
