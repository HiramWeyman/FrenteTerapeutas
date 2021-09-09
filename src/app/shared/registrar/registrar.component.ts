import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { RegistrarService } from 'src/app/services/services.index';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { sha256, sha224 } from 'js-sha256';
import { ErroresService } from '../../services/manejo_errores/errores.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html'
})
export class RegistrarComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  forma: FormGroup;

  private subscription: Subscription;

  isHidden = true;
  isHiddenMatricula = false;



  constructor( private fb: FormBuilder, private validadores: ValidadoresService, private _reg: RegistrarService,
               public router: Router, private _error: ErroresService ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.blockUI.start();
    this.crearFormulario();
    this.blockUI.stop();
  }


  get nombreNovalido(){
    return this.forma.get('usuario_nombre').invalid && this.forma.get('usuario_nombre').touched
  }

  get correoNovalido(){
    return this.forma.get('usuario_correo').invalid && this.forma.get('usuario_correo').touched
  }

  get direccionNovalido(){
    return this.forma.get('usuario_nombre').invalid && this.forma.get('usuario_nombre').touched
  }

/*   get telefonoNovalido(){
    return this.forma.get('usuario_telcsa').invalid && this.forma.get('usuario_telcsa').touched
  } */

  get celnoNovalido(){
    return this.forma.get('usuario_cel').invalid && this.forma.get('usuario_cel').touched
  }
  get emailNovalido(){
    return this.forma.get('usuario_correo').invalid && this.forma.get('usuario_correo').touched
  }

  get cedulaNovalido(){
    return this.forma.get('usuario_cedula').invalid && this.forma.get('usuario_cedula').touched
  }




  crearFormulario(){

    this.forma = this.fb.group({

      usuario_nombre: ['', Validators.required],
      usuario_direccion: ['', Validators.required],
      usuario_cel: ['', [Validators.required,Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)]],
      usuario_telcsa:  ['', [Validators.required,Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)]],
      usuario_correo: ['',Validators.email],
      usuario_cedula: ['', [Validators.required,Validators.maxLength(50)]],
      usuario_tipo: [1]
   
    });

  }

  guardar(){

    if (this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control =>{
        control.markAsTouched();
      })
    }else{
      this._reg.CountUser(this.forma.value).subscribe(user=>{

        if(user>0){
          Swal.fire('Error en Usuario', `El usuario ya ha sido registrado! , Revise su correo registrado o ingrese en el botón recuperar password`, 'error');
        }else{
          this._reg.create(this.forma.value).subscribe(usr => {
            this.router.navigate(['']);
              Swal.fire('Nuevo usuario', `Usuario creado con éxito! , Revise su correo registrado`, 'success');
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

      });

      
    }
    
  }



}
