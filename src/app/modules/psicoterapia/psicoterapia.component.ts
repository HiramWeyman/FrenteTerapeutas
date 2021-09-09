import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {TablaUsuario} from '../interfaces/tablausuario';
import { ActivatedRoute } from '@angular/router';

import { PsicoterapiaService } from 'src/app/services/psicoterapia.service';
import { Psicoterapia } from '../interfaces/psicoterapia';
import { PsicoinsertComponent } from '../psicoinsert/psicoinsert.component';
import { PsicoactComponent } from '../psicoact/psicoact.component';
import { PsicodetComponent } from '../psicodet/psicodet.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-psicoterapia',
  templateUrl: './psicoterapia.component.html',
  styleUrls: ['./psicoterapia.component.css']
})
export class PsicoterapiaComponent implements OnInit {
  tablaSessiones: Psicoterapia[];
  paciente_id:number;
  nombre:string;
  constructor(private activatedRoute: ActivatedRoute,public dialog: MatDialog,public router: Router,private service:PsicoterapiaService) { 


  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.paciente_id = parseInt(params['paciente_id']);
    })
    this.getNombre(this.paciente_id);
    this.TablaSessiones(this.paciente_id);

  }
  TablaSessiones(id:number) {
    console.log(id);
    this.service.getSessiones(id).subscribe(
      tablaSessiones => this.tablaSessiones = tablaSessiones
      );
  } 

  getNombre(id:number) {
    console.log(id);
    this.service.getNombre(id).subscribe(
      nombre => this.nombre = nombre
      );
  } 

  openDialog():void{
    const dialogRef = this.dialog.open(PsicoinsertComponent,{
      autoFocus: false,
      panelClass: 'trend-dialog',
      width: '900px', height: '900px'
    });

    dialogRef.componentInstance.paciente_id = this.paciente_id;
    dialogRef.afterClosed()
    .subscribe(() => {
      /* alert('Si jala'); */
      this.TablaSessiones(this.paciente_id);
    })
  /*   dialogRef.afterClosed().subscribe(() => { this.ngOnInit();} ); */
  }

/*   dialogRef.afterClosed
  .subscribe(() => {
  // update a variable or call a function when the dialog closes
  this.TablaSessiones(this.paciente_id);
  } */

  openDialoAct(paciente_id:number):void{
    const dialogRef = this.dialog.open(PsicoactComponent,{
      autoFocus: false,
      panelClass: 'trend-dialog',
      width: '900px', height: '900px'
    });
    dialogRef.componentInstance.paciente_id = paciente_id;
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDialogDet(paciente_id:number):void{
    const dialogRef = this.dialog.open(PsicodetComponent,{
      autoFocus: false,
      panelClass: 'trend-dialog',
      width: '900px', height: '900px'
    });
    dialogRef.componentInstance.paciente_id = paciente_id;
  }



  Eliminar(id:number,pac_psicoterapia:Psicoterapia){
  

    this.service.Eliminar(id,pac_psicoterapia).subscribe(usr => {
      this.router.navigate(['/psicoterapia/'+this.paciente_id]);
        Swal.fire('Session registrada', `Session del paciente eliminada !`, 'success');
        this.ngOnInit()
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

  }

  NotaAtencion(id:number){
     window.open(`${environment.rutaAPI}/Nota/${id}`);
  }

}
