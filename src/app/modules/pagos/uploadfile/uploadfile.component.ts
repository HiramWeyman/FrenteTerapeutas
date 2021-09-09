import { Component, OnInit,Inject, EventEmitter, Output} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { PagosService } from '../../../services/pagos.service';
import { environment, } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();
/*   urlEndPoint = `${environment.rutaAPISipu}`;
 */
  @BlockUI() blockUI: NgBlockUI;

  private fotoSeleccionada: File;

  private subscription: Subscription;

  pagos:any;

  constructor(
    public dialogRef:MatDialogRef<UploadfileComponent>,
    @Inject(MAT_DIALOG_DATA) public id:number,
    @Inject(MAT_DIALOG_DATA) public id_aspi:number,
    @Inject(MAT_DIALOG_DATA) public id_conv:number,
    @Inject(MAT_DIALOG_DATA) public desc:string,
    private _ps: PagosService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  public seleccionarFoto(event): void{
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);
  }

  public editarFoto(){
    this._ps.uploadFile(this.id, this.fotoSeleccionada)
      .subscribe(pagos => {
        //this.router.navigate(['/pagos', this.id_aspi, this.id_conv,this.desc]);
        //this._ps.setDataChanged(this.id_aspi);
        //this.getPagos();
        //this.someEvent.next('somePhone');
        this.blockUI.stop();
        //Swal.fire({icon: 'success',title: 'Imagen subida',showConfirmButton: false,timer: 3000});
        Swal.fire({icon: 'success',title: 'Imagen subida',showConfirmButton: false,timer: 3000});
        this.closeDialog();
      },
      error => {
        console.log(error);
        this.blockUI.stop();
        Swal.fire({title: 'ERROR!!!',text: error.message, icon: 'error'});
      })

    const source = timer(3000);
    const subscribe = source.subscribe(val => console.log(val));
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getPagos(){
    this.subscription = this._ps.getPago(this.id_aspi).subscribe(
      (pagos) => {
        this.pagos = pagos;
        console.log(this.pagos);
        /*
        this.forma.patchValue(this.convocatoria);
        this.forma.updateValueAndValidity();
        this.isHiddenNew = true;
        this.isHiddenUpdate = false;
        */
      }
    )
  }

}
