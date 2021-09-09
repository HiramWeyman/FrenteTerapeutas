import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import { AspiranteService } from 'src/app/services/aspirante.service';
import { Catescolar } from '../interfaces/catescolar';
import { Conv } from '../interfaces/conv';
import {Dvaspirante} from '../interfaces/dvaspirante';
import {Aspirante} from '../interfaces/aspirante';
import { Estados } from '../interfaces/estados';
import { Ures } from '../interfaces/ures';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actaspi',
  templateUrl: './actaspi.component.html',
  styleUrls: ['./actaspi.component.css']
})
export class ActaspiComponent implements OnInit {
  operaciones = [
    {valor:'suma', muestraValor:'Sumar'},
    {valor:'resta', muestraValor:'Restar'},
    {valor:'multiplicacion', muestraValor:'Multiplicar'},
    {valor:'division', muestraValor:'Dividir'}
  ];
  usuario:Dvaspirante=new Dvaspirante();
  convocatorias: Conv[];
  estados: Estados[];
  mun:any[];
  munproc:any[];
  matricula: any;
  catescolar:Catescolar[];
  ures:Ures[];
  id:number;
  constructor(
    private service:AspiranteService,
    public dialogRef:MatDialogRef<ActaspiComponent>,
    @Inject(MAT_DIALOG_DATA) public folio:number,
    @Inject(MAT_DIALOG_DATA) public ures_:string,
    @Inject(MAT_DIALOG_DATA) public edonac:string,
    @Inject(MAT_DIALOG_DATA) public edoproc:string,
    public router: Router
    ) { }

  ngOnInit() {
    this.Ures();
    this.Estados();
    this.Escolaridad();
    this.Convocatorias(this.ures_);
    this.Municipios(this.edonac);
    this.MunicipiosProc(this.edoproc);

    this.service.getUser(this.folio).subscribe(
      usuario => {
        this.usuario = usuario;
      }
      );
    //this.message='Actualiza Datos de Aspirante';
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

  ActualizaAspirante(aspirante:Dvaspirante){
    this.id=aspirante.vasp_folioaspi;
    this.service.Update(aspirante,this.id).subscribe(usr => {
      this.router.navigate(['/tablaaspi']);
        Swal.fire('Aspirante Actualizado', `Datos del aspirante actualizados !`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.error.message,
        icon: 'error'});
    });
   console.log(aspirante);
   this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
