import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { PsicoterapiaService } from 'src/app/services/psicoterapia.service';
import { Psicoterapia } from '../interfaces/psicoterapia';

@Component({
  selector: 'app-psicoinsert',
  templateUrl: './psicoinsert.component.html',
  styleUrls: ['./psicoinsert.component.css']
})
export class PsicoinsertComponent implements OnInit {
  session:any;
  nosession:Number;
  descrip:any;
  pac_psico:Psicoterapia=new Psicoterapia();
  tablaSessiones: Psicoterapia[];
  constructor(
    public dialogRef:MatDialogRef<PsicoinsertComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    private service:PsicoterapiaService,
    public router: Router
  ) { }

  ngOnInit() {
    
   this.CountSessiones(this.paciente_id);
  }
  closeDialog(){
    this.dialogRef.close();
    this.TablaSessiones(this.paciente_id);
  }

   CountSessiones(id:number) {
    this.service.CountSessiones(id).subscribe(
      session => {
        this.session = session
        console.log(this.session);
        this.nosession=parseInt(this.session)+1;
        this.descrip='Session '+ this.nosession;
      }
      );
  }   

  TablaSessiones(id:number) {
    console.log(id);
    this.service.getSessiones(id).subscribe(
      tablaSessiones => this.tablaSessiones = tablaSessiones
      );
  } 

  GuardaSession(pac_psico:Psicoterapia){
    console.log(pac_psico);
    console.log(this.paciente_id);
    pac_psico.pac_psico_pac_id=this.paciente_id;
    pac_psico.pac_psico_desc=this.descrip;

    this.service.GuardaSession(pac_psico).subscribe(usr => {
      this.router.navigate(['/psicoterapia/'+this.paciente_id]);
        Swal.fire('Session registrada', `Session del paciente registrada !`, 'success');
      
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });

   this.closeDialog();
  }



}
