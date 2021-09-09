import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Rx'; 
import { promise } from 'protractor';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {AspiranteService} from '../../services/aspirante.service';
import {Conv} from '../interfaces/conv';
import {Estados} from '../interfaces/estados';
import {Catescolar} from '../interfaces/catescolar';
import {Aspirante } from '../interfaces/aspirante';
import {Ures} from '../interfaces/ures';

@Component({
  selector: 'app-datosaspi',
  templateUrl: './datosaspi.component.html',
  styleUrls: ['./datosaspi.component.css']
})
export class DatosaspiComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  forma: FormGroup;
  convocatorias: Conv[];
  estados: Estados[];
  user:Aspirante[];
  mun:any[];
  munproc:any[];
  usuario: any;
  matricula: any;
  catescolar:Catescolar[];
  ures:Ures[];

  constructor(private fb: FormBuilder,private service:AspiranteService,public router: Router ) { }

  ngOnInit() {
    if(sessionStorage.getItem('Login')){
      this.usuario = sessionStorage.getItem('Login');
      this.matricula=sessionStorage.getItem('Mat');
    }
    else{
      this.router.navigate(['/']);
    }
   // this.Convocatorias();
    this.Ures();
    this.Estados();
    this.Escolaridad();
    this.crearFormulario();
    //this.usuario=sessionStorage.getItem('Login');
    //this.matricula=sessionStorage.getItem('Mat');
    console.log(sessionStorage.getItem('Login'))
    console.log(sessionStorage.getItem('Nombre'))
    console.log(sessionStorage.getItem('Mat'))

  }

  Ures() {
    this.service.getUres().subscribe(
      ures => this.ures = ures
      );
  } 

  Convocatorias(ures:string) {
    this.service.getConvocatorias(ures).subscribe(
      convocatorias => this.convocatorias = convocatorias
      );
      
  } 

  Escolaridad() {
    this.service.getEscolaridad().subscribe(
      catescolar => this.catescolar = catescolar
      );
  } 

  Estados() {
    this.service.getEstados().subscribe(
      estados => this.estados = estados
      );
  } 

  Municipios(id:string) {
    this.service.getMunicipios(id).subscribe(
      mun => this.mun = mun
      );
    
  } 

  MunicipiosProc(id:string) {
    this.service.getMunicipios(id).subscribe(
      munproc => this.munproc = munproc
      );
  } 
  
  get MunProcNovalido(){
    return this.forma.get('aspi_mun_proc').invalid && this.forma.get('aspi_mun_proc').touched
  }
  get EdoProcNovalido(){
    return this.forma.get('aspi_edo_proc').invalid && this.forma.get('aspi_edo_proc').touched
  }
  get MunNacNovalido(){
    return this.forma.get('aspi_mun_nac').invalid && this.forma.get('aspi_mun_nac').touched
  }
  get EdoNacNovalido(){
    return this.forma.get('aspi_edo_nac').invalid && this.forma.get('aspi_edo_nac').touched
  }
  get TrabajaNovalido(){
    return this.forma.get('aspi_trabaja').invalid && this.forma.get('aspi_trabaja').touched
  }
  get CedulaNovalido(){
    return this.forma.get('aspi_con_cedula').invalid && this.forma.get('aspi_con_cedula').touched
  }
  get TituloNovalido(){
    return this.forma.get('aspi_con_titulo').invalid && this.forma.get('aspi_con_titulo').touched
  }
  get EscolaridadNovalido(){
    return this.forma.get('aspi_escolaridad').invalid && this.forma.get('aspi_escolaridad').touched
  }
  get EscuelaProcedeNovalido(){
    return this.forma.get('aspi_esc_procede').invalid && this.forma.get('aspi_esc_procede').touched
  }
  get TelCelNovalido(){
    return this.forma.get('aspi_telcel').invalid && this.forma.get('aspi_telcel').touched
  }

  get ColoniaNovalido(){
    return this.forma.get('aspi_colonia').invalid && this.forma.get('aspi_colonia').touched
  }
  get NumeroNovalido(){
    return this.forma.get('aspi_numero').invalid && this.forma.get('aspi_numero').touched
  }
  get CalleNovalido(){
    return this.forma.get('aspi_calle').invalid && this.forma.get('aspi_calle').touched
  }
  get NacionalidadNovalido(){
    return this.forma.get('aspi_nacionalidad').invalid && this.forma.get('aspi_nacionalidad').touched
  }
  get CivilNovalido(){
    return this.forma.get('aspi_ecivil').invalid && this.forma.get('aspi_ecivil').touched
  }
  get RfcNovalido(){
    return this.forma.get('aspi_rfc').invalid && this.forma.get('aspi_rfc').touched
  }
  get CorreoNovalido(){
    return this.forma.get('aspi_correo').invalid && this.forma.get('aspi_correo').touched
  }
  get CurpNovalido(){
    return this.forma.get('aspi_curp').invalid && this.forma.get('aspi_curp').touched
  }
  get GeneroNovalido(){
    return this.forma.get('aspi_genero').invalid && this.forma.get('aspi_genero').touched
  }
  get FnacNovalido(){
    return this.forma.get('aspi_fnacimiento').invalid && this.forma.get('aspi_fnacimiento').touched
  }
  get PaternoNovalido(){
    return this.forma.get('aspi_paterno').invalid && this.forma.get('aspi_paterno').touched
  }
  get NombreNovalido(){
    return this.forma.get('aspi_nombre').invalid && this.forma.get('aspi_nombre').touched
  }
  get ConvNovalido(){
    return this.forma.get('aspi_numconvo').invalid && this.forma.get('aspi_numconvo').touched
  }
  get EscolarNovalido(){
    return this.forma.get('aspi_escolaridad').invalid && this.forma.get('aspi_escolaridad').touched
  }

  crearFormulario(){
  
    this.forma = this.fb.group({
      aspi_usuario:[this.usuario],
      aspi_numconvo:['',[Validators.required]],
      aspi_nombre: ['', [Validators.required,Validators.maxLength(50)]],
      aspi_paterno: ['', [Validators.required,Validators.maxLength(50)]],
      aspi_materno: ['', [Validators.required,Validators.maxLength(50)]],
      aspi_fnacimiento:['',[Validators.required]],
      aspi_genero:['',[Validators.required]],
      aspi_curp:['',[Validators.required]],
      aspi_correo:['',[Validators.required]],
      aspi_rfc:['',[Validators.required]],
      aspi_ecivil:['',[Validators.required]],
      aspi_nacionalidad:['',[Validators.required]],
      aspi_calle:['',[Validators.required]],
      aspi_numero:['',[Validators.required]],
      aspi_colonia:['',[Validators.required]],
      aspi_telcasa:[''],
      aspi_telofi:[''],
      aspi_telcel:['',[Validators.required]],
      aspi_escolaridad:['',[Validators.required]],
      aspi_esc_procede:['',[Validators.required]],
      aspi_con_titulo:['',[Validators.required]],
      aspi_con_cedula:['',[Validators.required]],
      aspi_trabaja:['',[Validators.required]],
      aspi_lugar_trabajo:[''],
      aspi_actividades:[''],
      aspi_puesto:[''],
      aspi_antiguedad:[''],
      aspi_edo_nac:['',[Validators.required]],
      aspi_mun_nac:['',[Validators.required]],
      aspi_edo_proc:['',[Validators.required]],
      aspi_mun_proc:['',[Validators.required]],
      aspi_matricula:[this.matricula],
      aspi_user:['DESASIPU']
    });

  } 


  

  Guardar(){
    this.blockUI.start();
    //console.log(this.forma);
    if (this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control =>{
        control.markAsTouched();
        this.blockUI.stop();
      })
    }else{
/*
      this.service.getUsuario(this.forma.value).subscribe(
        user => this.user = user
        );
        console.log(this.user);
        if(this.user){
          Swal.fire({
            title: 'ERROR!!!',
            text: 'Este usuario ya se ha registrado',
            icon: 'error'});
        }else{
*/
          this.service.create(this.forma.value).subscribe(usr => {
            this.router.navigate(['/dashboard']);
              Swal.fire('Nuevo Aspirante registrado', `Usuario con folio  creado con éxito!`, 'success');
          },
          error => {
            console.log(error);
            console.log(error.error.message);
            var trace = error.error.message.split("constraint ");
            var splitted = trace[1].split("["); 
            var splitted2 = splitted[1].split("]");
            var constraint = splitted2[0].split(".");
            console.log("constraint"+constraint[1]); 
            this.blockUI.stop();
            this.service.getError(constraint[1]).subscribe(err => {
              //console.log("err"+err);
              Swal.fire({title: 'ERROR!!!', text: err[0].cerr_mensaje, icon: 'error'});
            })
          });

        }

    }
   
  }
//}
