import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Rx'; 
import { promise } from 'protractor';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {PacientesService} from '../../services/pacientes.service';
import {Conv} from '../interfaces/conv';
import {Estados} from '../interfaces/estados';
import {Municipios} from '../interfaces/municipios';
import {Escolar} from '../interfaces/escolaridad';
import {Edocivil} from '../interfaces/edocivil';
import {Estatus} from '../interfaces/estatus';
import {Modalidad} from '../interfaces/modalidad';
import {Genero} from '../interfaces/genero';


@Component({
  selector: 'app-datospaciente',
  templateUrl: './datospaciente.component.html',
  styleUrls: ['./datospaciente.component.scss']
})
export class DatospacienteComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  forma: FormGroup;
  estados: Estados[];
  mun:Municipios[];
  munres:Municipios[];
  edocivil:Edocivil[];
  catescolar:Escolar[];
  estatus:Estatus[];
  modalidad:Modalidad[];
  genero:Genero[];
  usuario: any;


  constructor(private fb: FormBuilder,private service:PacientesService,public router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('Login')){
      this.usuario = sessionStorage.getItem('Login');
    }
    else{
      this.router.navigate(['/']);
    }
    this.Escolaridad();
    this.Estados();
    this.Estatus();
    this.Edocivil();
    this.Modalidad();
    this.Genero();
    this.crearFormulario();
    
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

  MunicipiosRes(id:string) {
    this.service.getMunicipios(id).subscribe(
      munres => this.munres = munres
      );
    
  } 

  Edocivil() {
    this.service.getEstadoCivil().subscribe(
      edocivil => this.edocivil = edocivil
      );
  } 

  Estatus() {
    this.service.getEstatus().subscribe(
      estatus => this.estatus = estatus
      );
  } 

  Modalidad() {
    this.service.getModalidad().subscribe(
      modalidad => this.modalidad = modalidad
      );
  } 

  Genero() {
    this.service.getGenero().subscribe(
      genero => this.genero = genero
      );
  } 



   get NombreNovalido(){
    return this.forma.get('paciente_nombre').invalid && this.forma.get('paciente_nombre').touched
  }

  get GeneroNovalido(){
    return this.forma.get('paciente_sexo').invalid && this.forma.get('paciente_sexo').touched
  }

  get EdadNovalido(){
    return this.forma.get('paciente_edad').invalid && this.forma.get('paciente_edad').touched
  }

  get EdoNacNovalido(){
    return this.forma.get('paciente_edo_nac').invalid && this.forma.get('paciente_edo_nac').touched
  }

  get MunNacNovalido(){
    return this.forma.get('paciente_mun_nac').invalid && this.forma.get('paciente_mun_nac').touched
  }

  get EdoResNovalido(){
    return this.forma.get('paciente_edo_res').invalid && this.forma.get('paciente_edo_res').touched
  }

  get MunResNovalido(){
    return this.forma.get('paciente_mun_res').invalid && this.forma.get('paciente_mun_res').touched
  }

  get FnacNovalido(){
    return this.forma.get('paciente_fec_nac').invalid && this.forma.get('paciente_fec_nac').touched
  }

  get CivilNovalido(){
    return this.forma.get('paciente_edo_civil').invalid && this.forma.get('paciente_edo_civil').touched
  }

  get EstatusNovalido(){
    return this.forma.get('paciente_estatus').invalid && this.forma.get('paciente_estatus').touched
  }

  get DireccionNovalido(){
    return this.forma.get('paciente_direccion').invalid && this.forma.get('paciente_direccion').touched
  }

  get OcupacionNovalido(){
    return this.forma.get('paciente_ocupacion').invalid && this.forma.get('paciente_ocupacion').touched
  }

  get EscolarNovalido(){
    return this.forma.get('paciente_escolaridad').invalid && this.forma.get('paciente_escolaridad').touched
  }

  get FingNovalido(){
    return this.forma.get('paciente_fec_ing').invalid && this.forma.get('paciente_fec_ing').touched
  }

  get TelCelNovalido(){
    return this.forma.get('paciente_telefono').invalid && this.forma.get('paciente_telefono').touched
  }

  get ModalidadNovalido(){
    return this.forma.get('paciente_telefono').invalid && this.forma.get('paciente_telefono').touched
  }

  crearFormulario(){
  
    this.forma = this.fb.group({
      paciente_usuario:[this.usuario],
      paciente_nombre: ['', [Validators.required,Validators.maxLength(50)]],
      paciente_sexo: ['', [Validators.required]],
      paciente_edad: ['', [Validators.required,]],
      paciente_edo_nac:['',[Validators.required]],
      paciente_mun_nac:['',[Validators.required]],
      paciente_edo_res:['',[Validators.required]],
      paciente_mun_res:['',[Validators.required]],
      paciente_fec_nac:['',[Validators.required]],
      paciente_edo_civil:['',[Validators.required]],
      paciente_estatus:['',[Validators.required]],
      paciente_direccion:['',[Validators.required,Validators.maxLength(100)]],
      paciente_ocupacion:['',[Validators.required]],
      paciente_escolaridad:['',[Validators.required]],
      paciente_fec_ing:['',[Validators.required]],
      paciente_telefono:['',[Validators.required]],
      paciente_telefono_eme:[''],
      paciente_modalidad:['',[Validators.required]]
    });

}

Guardar(){
  this.blockUI.start();
  console.log(this.forma);
  if (this.forma.invalid){
    return Object.values( this.forma.controls ).forEach( control =>{
      control.markAsTouched();
      this.blockUI.stop();
    })
  }else{

        this.service.create(this.forma.value).subscribe(usr => {
          console.log(usr)
          if(usr){
            this.router.navigate(['/pacientes']);
            Swal.fire('Nuevo paciente registrado', `Paciente  creado con éxito!`, 'success');
          }
         
        },
        error => {
          console.log(error);
          console.log(error.error.message);
          this.blockUI.stop();
          Swal.fire({title: 'ERROR!!!', text: error, icon: 'error'});
        });

      }

  }
 
}



