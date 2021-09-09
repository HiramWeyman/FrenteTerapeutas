import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {TablaUsuario} from '../interfaces/tablausuario';
import {Usuario} from '../interfaces/usuarios';
import { from, Subscription } from 'rxjs';
import{ ActaspiComponent} from '../actaspi/actaspi.component';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ActpacComponent } from '../actpac/actpac.component';
import { DescpacComponent } from '../descpac/descpac.component';
import { MotivoconsComponent } from '../motivocons/motivocons.component';
import { SituacionactComponent } from '../situacionact/situacionact.component';
import { RecuerdosComponent } from '../recuerdos/recuerdos.component';
import { DiversionesComponent } from '../diversiones/diversiones.component';
import { AjustesComponent } from '../ajustes/ajustes.component';
import { DesarrolloComponent } from '../desarrollo/desarrollo.component';
import { DiagnosticoComponent } from '../diagnostico/diagnostico.component';
import { environment } from 'src/environments/environment';
import { DiagnosticoDetComponent } from '../diagnostico-det/diagnostico-det.component';
import { PacienteDetComponent } from '../paciente-det/paciente-det.component';
import { Paciente } from '../interfaces/paciente';
import Swal from 'sweetalert2';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  user:number;
  tablaUsers: TablaUsuario[];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  displayedColumns: string[] = ['folio','usuario','convocatoria','nombre'];
  public dataSource = new MatTableDataSource<TablaUsuario>();
  private subscription: Subscription;
  usuario: TablaUsuario[];
  public show = false;
  datos: TablaUsuario[] = [];
  message:any;
  pacientes:any;
  date=new Date();
  fecNac: any;
  fecIng: any;
  nom:string;
  constructor(public dialog: MatDialog,public router: Router,private service:PacientesService) {
    
    dialog.afterAllClosed
    .subscribe(() => {
    // update a variable or call a function when the dialog closes
    this.TablaPacientes(this.user);
    }
  );
  }


       
  ngOnInit() {
    this.user=parseInt(sessionStorage.getItem('Login'));
    this.TablaPacientes( this.user);
    var input = document.getElementById("search");
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("Btn").click();
      }
    });
  }

  paciente(){
    this.router.navigate(['/datospaciente']);
  }

  TablaPacientes(id:number) {
    console.log(id);
    this.service.getPacientes(id).subscribe(
      pacientes => {
        this.pacientes = pacientes
      /*   console.log( this.pacientes); */
      }
      );
  } 

  TablaPacientesNombre(nom:string) {
    if(nom){
      nom=nom.toLocaleUpperCase();
      console.log(nom);
      this.service.getPacientesNombre(nom).subscribe(
        pac => {
          this.pacientes = pac
      /*     console.log(this.pacientes);
          console.log('Si entra'); */
        }
        );
    }
    else{
      this.ngOnInit();
    }

  } 

  openDialog(paciente_id:number,id_usuario:number,cve_edo:string,cve_edo_res:string):void{
      const dialogRef = this.dialog.open(ActpacComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '600px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
      dialogRef.componentInstance.id_usuario = id_usuario;
      dialogRef.componentInstance.cve_edo = cve_edo;
      dialogRef.componentInstance.cve_edo_res = cve_edo_res;


    }

   openDialogDesc(paciente_id:number):void{
      const dialogRef = this.dialog.open(DescpacComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '600px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogMotivoCons(paciente_id:number):void{
      const dialogRef = this.dialog.open(MotivoconsComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '500px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogSituacionAct(paciente_id:number):void{
      const dialogRef = this.dialog.open(SituacionactComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '320px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogRecuerdos(paciente_id:number):void{
      const dialogRef = this.dialog.open(RecuerdosComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '250px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogDiversiones(paciente_id:number):void{
      const dialogRef = this.dialog.open(DiversionesComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '405px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogAjustesSoc(paciente_id:number):void{
      const dialogRef = this.dialog.open(AjustesComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '500px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogDesarrolloSex(paciente_id:number):void{
      const dialogRef = this.dialog.open(DesarrolloComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '600px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogDiagnostico(paciente_id:number,parametro:number):void{
      const dialogRef = this.dialog.open(DiagnosticoComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '600px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
      dialogRef.componentInstance.parametro = parametro;
    }

    openDialogDiagnosticoDet(paciente_id:number):void{
      const dialogRef = this.dialog.open(DiagnosticoDetComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '600px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    openDialogPacienteDet(paciente_id:number):void{
      const dialogRef = this.dialog.open(PacienteDetComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '600px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }
    
    reporte(id: number){

      window.open(`${environment.rutaAPI}/Reporte/${id}`);
    }

    reportePDF(id: number){
      window.open(`${environment.rutaAPI}/ReportePDF/${id}`);
    }

    DesactivarPaciente(paciente_id:number,paciente:Paciente){
  
      this.service.DesactivarPaciente(paciente_id,paciente).subscribe(usr => {

        if(usr){
          this.router.navigate(['/pacientes']);
          this.ngOnInit();
          Swal.fire('Paciente Desactivado', `Datos del paciente desactivados !`, 'success');
        }
        
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
