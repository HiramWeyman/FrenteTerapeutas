import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {TablaUsuario} from '../interfaces/tablausuario';
import { Subscription } from 'rxjs';
import { PacientesService } from 'src/app/services/pacientes.service';
import { DiagnosticoComponent } from '../diagnostico/diagnostico.component';
import { environment } from 'src/environments/environment';
import { MetodoevaluacionComponent } from '../metodoevaluacion/metodoevaluacion.component';

@Component({
  selector: 'app-expclinico',
  templateUrl: './expclinico.component.html',
  styleUrls: ['./expclinico.component.css']
})
export class ExpclinicoComponent implements OnInit {

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
      pacientes => this.pacientes = pacientes
      );
  } 

  TablaPacientesNombre(nom:string) {
    if(nom){
      nom=nom.toLocaleUpperCase();
      console.log(nom);
      this.service.getPacientesNombre(nom).subscribe(
        pac => {
          this.pacientes = pac
          console.log(this.pacientes);
          console.log('Si entra');
        }
        );
    }
    else{
      this.ngOnInit();
    }

  } 
  
  openDialogEvaluacion(paciente_id:number):void{
    const dialogRef = this.dialog.open(MetodoevaluacionComponent,{
      autoFocus: false,
      panelClass: 'trend-dialog',
      width: '900px', height: '600px'
    });
    dialogRef.componentInstance.paciente_id = paciente_id;
/*     dialogRef.afterClosed().subscribe(() => {
      this.openDialogEvaluacion(paciente_id);
    }); */
  }


    openDialogDiagnostico(paciente_id:number):void{
      const dialogRef = this.dialog.open(DiagnosticoComponent,{
        autoFocus: false,
        panelClass: 'trend-dialog',
        width: '900px', height: '600px'
      });
      dialogRef.componentInstance.paciente_id = paciente_id;
    }

    reportePDF(id: number){
      window.open(`${environment.rutaAPI}/Hojausos/${id}`);
    }

    reporteTratamiento(id: number){
      window.open(`${environment.rutaAPI}/Tratamiento/${id}`);
    }
}
