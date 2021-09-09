import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { PagosService } from '../../../services/pagos.service';
import { AspiranteService } from '../../../services/aspirante.service';

@Component({
  selector: 'app-pagosform',
  templateUrl: './pagosform.component.html',
  styleUrls: ['./pagosform.component.scss']
})
export class PagosformComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  forma: FormGroup;

  bancos: any;
  referencia: any;

  constructor(
    public dialogRef:MatDialogRef<PagosformComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public id_aspi:number,
    @Inject(MAT_DIALOG_DATA) public id_conv:number,
    @Inject(MAT_DIALOG_DATA) public desc:string,
    public router: Router,
    private _ps: PagosService,
    private _as: AspiranteService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.crearFormulario();
    this.getbancos();
    this.getreferencia();
  }

  get descripNovalido(){
    return this.forma.get('pago_descrip').invalid && this.forma.get('pago_descrip').touched
  }

  get bancoNovalido(){
    return this.forma.get('pago_banco').invalid && this.forma.get('pago_banco').touched
  }

  get fechaNovalido(){
    return this.forma.get('pago_fpago').invalid && this.forma.get('pago_fpago').touched
  }

  get montoNovalido(){
    return this.forma.get('pago_monto').invalid && this.forma.get('pago_monto').touched
  }

  get ticketNovalido(){
    return this.forma.get('pago_ticket').invalid && this.forma.get('pago_ticket').touched
  }

  get referenciaNovalido(){
    return this.forma.get('pago_referencia').invalid && this.forma.get('pago_referencia').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      pago_folioaspi: [this.id_aspi],
      pago_descrip: ['', [Validators.required, Validators.maxLength(100)]],
      pago_banco: ['', Validators.required],
      pago_fpago: ['', Validators.required],
      pago_monto: ['', Validators.required],
      pago_ticket: ['', [Validators.required, Validators.maxLength(20)]],
      pago_referencia: ['', Validators.required],
      pago_user: [sessionStorage.getItem('Login')],
      pago_revision: ['P']
    });
  }

  getbancos(){
      this._ps.getBancos().subscribe(
        bancos => {this.bancos = bancos}
        );
  }

  getreferencia(){
    this._ps.getReferencia(this.id_aspi).subscribe(
      referencia => {this.referencia = referencia}
      );
  } 


  closeDialog(){
    this.dialogRef.close();
  }

  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    //const reg = /^\d*(?:[.,]\d{1,2})?$/;
    const reg = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

  guardar(){
    this.blockUI.start();
    if (this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control =>{
        control.markAsTouched();
        this.blockUI.stop();
      })
    }else{
      //console.log(this.forma.value);
      this._ps.crear(this.forma.value).subscribe(master => {
        this.blockUI.stop();
        //this.router.navigate(['/pagos', this.id_aspi, this.id_conv,this.desc]);
        Swal.fire({icon: 'success',title: 'Pago Guardado',showConfirmButton: false,timer: 3000});
        this.closeDialog();
      },
      error => {
        console.log(error);
        var trace = error.error.split("ORA-");
        var splitted = trace[1].split("("); 
        var splitted2 = splitted[1].split(")");
        var constraint = splitted2[0].split(".");
        console.log("constraint"+constraint[1]); 
        this.blockUI.stop();
        this._as.getError(constraint[1]).subscribe(err => {
          console.log("err"+err);
          Swal.fire({title: 'ERROR!!!', text: err[0].cerr_mensaje, icon: 'error'});
        })
      })
    }
  }

}
