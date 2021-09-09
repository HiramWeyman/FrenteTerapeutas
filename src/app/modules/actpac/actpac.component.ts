import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Catescolar } from '../interfaces/catescolar';
import { Conv } from '../interfaces/conv';
import {Dvaspirante} from '../interfaces/dvaspirante';
import {Aspirante} from '../interfaces/aspirante';
import { Estados } from '../interfaces/estados';
import { Ures } from '../interfaces/ures';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Municipios } from '../interfaces/municipios';
import { Edocivil } from '../interfaces/edocivil';
import { Escolar } from '../interfaces/escolaridad';
import { Modalidad } from '../interfaces/modalidad';
import { Estatus } from '../interfaces/estatus';
import { Genero } from '../interfaces/genero';
import { Paciente } from '../interfaces/paciente';
import * as moment from 'moment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actpac',
  templateUrl: './actpac.component.html',
  styleUrls: ['./actpac.component.css']
})
export class ActpacComponent implements OnInit {

  estados: Estados[];
  mun:Municipios[];
  munres:Municipios[];
  edocivil:Edocivil[];
  catescolar:Escolar[];
  estatus:Estatus[];
  modalidad:Modalidad[];
  genero:Genero[];
  fec1:String;
  paciente:Paciente=new Paciente();
  id:number;
  
  constructor(
    private service:PacientesService,
    public dialogRef:MatDialogRef<ActpacComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    @Inject(MAT_DIALOG_DATA) public id_usuario:number,
    @Inject(MAT_DIALOG_DATA) public cve_edo:string,
    @Inject(MAT_DIALOG_DATA) public cve_edo_res:string,
    public router: Router,
   // public datepipe: DatePipe
  ) { }

  ngOnInit() {
    //console.log(this.cve_edo);
    this.Escolaridad();
    this.Estados();
    this.Estatus();
    this.Edocivil();
    this.Modalidad();
    this.Genero();
    this.Municipios(this.cve_edo);
    this.MunicipiosRes(this.cve_edo_res);
    this.service.getPaciente(this.paciente_id).subscribe(
      paciente => {
        this.paciente = paciente;
        this.fec1=this.paciente.paciente_fec_nac.toString();
        this.fec1=this.fec1.substr(0, 10);
        this.paciente.paciente_fec_nac = this.convert(this.paciente.paciente_fec_nac);
        this.paciente.paciente_fec_ing = this.convert(this.paciente.paciente_fec_ing);
/*         console.log(this.paciente.paciente_fec_nac); 
        console.log(this.convert(this.paciente.paciente_fec_nac)); */
      }
      );
  }

  Escolaridad() {
    this.service.getEscolaridad().subscribe(
      catescolar => this.catescolar = catescolar
      );
  } 

   convert(str:string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  Estados() {
    this.service.getEstados().subscribe(
      estados => this.estados = estados
      );
  } 

  Municipios(cve_edo:string) {
    //console.log(cve_edo);
    this.service.getMunicipios(cve_edo).subscribe(
      mun => this.mun = mun
      );
      //console.log(this.mun);
    
  } 

  MunicipiosRes(cve_edo:string) {
    //console.log(cve_edo);
    this.service.getMunicipiosRes(cve_edo).subscribe(
      munres =>{
        this.munres = munres
        console.log(this.munres);
      } 
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

  ActualizaPaciente(paciente:Paciente){
    this.id=paciente.paciente_id;
    this.service.Update(this.id,paciente).subscribe(usr => {
      this.router.navigate(['/pacientes']);
        Swal.fire('Paciente Actualizado', `Datos del paciente actualizados !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
   console.log(paciente);
   this.Municipios(paciente.paciente_edo_nac.toString());
   this.MunicipiosRes(paciente.paciente_edo_res.toString());
   this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
