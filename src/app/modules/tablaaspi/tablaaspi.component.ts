import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AspiranteService} from '../../services/aspirante.service';
import { ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {TablaUsuario} from '../interfaces/tablausuario';
import {Usuario} from '../interfaces/usuarios';
import { from, Subscription } from 'rxjs';
import{ ActaspiComponent} from '../actaspi/actaspi.component';




@Component({
  selector: 'app-tablaaspi',
  templateUrl: './tablaaspi.component.html',
  styleUrls: ['./tablaaspi.component.css']
})

export class TablaaspiComponent implements OnInit {
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
  
  constructor(public dialog: MatDialog,public router: Router,private service:AspiranteService ) { }

  ngOnInit() {
    this.user=parseInt(sessionStorage.getItem('Login'));
    this.service.getTablaUsuario(this.user).subscribe(
      usuario => {
        this.usuario = usuario;
        if(this.usuario){
          this.show=true;
        }
        /* console.log(this.usuario); */
      }
      );
    this.message='Aspirante';
  }

  aspirante(){
    this.router.navigate(['/datosaspi']);
  }


  openDialog(folio:number,ures:string,edonac:string,edoproc:string):void{
  /*   console.log(ures);
    console.log(edonac);
    console.log(edoproc); */
    const dialogRef = this.dialog.open(ActaspiComponent,{
      height: '400px',
      width: '600px',
    });
    dialogRef.componentInstance.folio = folio;
    dialogRef.componentInstance.ures_ = ures;
    dialogRef.componentInstance.edonac = edonac;
    dialogRef.componentInstance.edoproc = edoproc;

  }
  


}
  

