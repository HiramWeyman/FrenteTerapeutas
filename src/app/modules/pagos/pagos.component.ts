import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { MatDialog, MatSort } from '@angular/material';
import { PagosService } from '../../services/pagos.service';
import { PagosformComponent } from './pagosform/pagosform.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { environment, } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  urlEndPoint = `${environment.rutaAPI}`;

  id_aspi: number;
  id_conv: number;
  desc: string;
  pagos:any;

  isHidden: true;

  p: number = 1;

  type: string;

  private subscription: Subscription;
  
  constructor( private activatedRoute: ActivatedRoute, private fb: FormBuilder, public router: Router,
               public dialog: MatDialog, private _ps: PagosService, private http: HttpClient ) { }
 
  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.id_aspi = params['id_aspi'];
      this.id_conv = params['id_conv'];
      this.desc = params['desc'];

      this._ps.dataChanged.subscribe(response=>{
        console.log();
      })

      if (this.id_aspi != 0){
        this.subscription = this._ps.getPago(this.id_aspi).subscribe(
          (pagos) => {
            this.pagos = pagos;
            console.log(this.pagos);
            this._ps.setDataChanged(this.id_aspi);
          }
        )
      }
    })

  }

  openDialog():void{
    const dialogRef = this.dialog.open(PagosformComponent,{
      height: '60%',
      width: '40%',
    });
    dialogRef.componentInstance.id_aspi = this.id_aspi;
    dialogRef.componentInstance.id_conv = this.id_conv;
    dialogRef.componentInstance.desc = this.desc;

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openUpload(id: number):void{
    const dialogRef2 = this.dialog.open(UploadfileComponent,{
      height: '60%',
      width: '40%',
    });
    dialogRef2.componentInstance.id = id;
    dialogRef2.componentInstance.id_aspi = this.id_aspi;
    dialogRef2.componentInstance.id_conv = this.id_conv;
    dialogRef2.componentInstance.desc = this.desc;

    dialogRef2.afterClosed().subscribe(() => {
      
        this.ngOnInit();
      
    });

  }

  delete(id: number){
    this.blockUI.start();
    const data = { pago_umod: sessionStorage.getItem('Login')};
    this._ps.eliminarPago(id, data).subscribe(master => {
      this.subscription = this._ps.getPago(this.id_aspi).subscribe(
        (pagos) => {
          this.pagos = pagos;
        }
      )
      this.blockUI.stop();
      Swal.fire({icon: 'success',title: 'Pago Eliminado',showConfirmButton: false,timer: 3000});
    },
    error => {
      console.log(error);
      this.blockUI.stop();
      Swal.fire({title: 'ERROR!!!',text: error.message, icon: 'error'});
    })
  }

  getImageFromService(url, type) {
    this.blockUI.start('Abriendo documento...');
    this.printImage(url).subscribe((response) => {
      const file = new Blob([response], { type: type });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.blockUI.stop();
    },
    error => {
      this.blockUI.stop();
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

}

printImage(url): any {
  const httpOptions = {
    responseType: 'arraybuffer' as 'json'
  };
  return this.http.get<any>(url, httpOptions);
}

}
