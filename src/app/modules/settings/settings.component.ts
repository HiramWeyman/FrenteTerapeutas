import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { RegistrarService } from 'src/app/services/services.index';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user:number;
  forma: FormGroup;

  constructor( private fb: FormBuilder, private validadores: ValidadoresService, private _reg: RegistrarService,
               public router: Router ) { }

  ngOnInit() {
    this.user=parseInt(sessionStorage.getItem('Login'));
    this.crearFormulario();
  }

  get passwordNovalido(){
    return this.forma.get('usuario_password').invalid && this.forma.get('usuario_password').touched
  }

  get repasswordNovalido(){
    //return this.forma.get('repassword').invalid && this.forma.get('repassword').touched
    const pass1 = this.forma.get('usuario_password').value;
    const pass2 = this.forma.get('repassword').value;
    
    return ( pass1 === pass2) ? false : true;
  }
  
  crearFormulario(){

    this.forma = this.fb.group({
      usuario_id: [this.user],
      usuario_password: ['', [Validators.required,Validators.maxLength(50)]],
      repassword: ['', [Validators.required,Validators.maxLength(50)]]
    },{
      validators: this.validadores.passwordsIguales('usuario_password','repassword')
    });

  }

  guardar(){

    if (this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control =>{
        control.markAsTouched();
      })
    }else{
      //console.log(this.forma.value);
      this._reg.cambiarPassword(this.forma.value).subscribe(usr => {
        this.router.navigate(['']);
          Swal.fire('Password Cambiado', `Password cambiado con éxito!`, 'success');
          //this.cargarUsers();
      },
      error => {
        console.log(error);
        
    /*     var splitted = error.error.message.split("["); 
        var splitted2 = splitted[2].split("]"); 
        var constraint = splitted2[0].split("."); 
        this._error.getError(constraint[1]).subscribe(err => {
          console.log(err);
          Swal.fire({
            title: 'ERROR!!!',
            text: err[0].cerr_mensaje,
            icon: 'error'});
        }) */

        
        console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
        
      });
      
    }
    
  }


    
  }



