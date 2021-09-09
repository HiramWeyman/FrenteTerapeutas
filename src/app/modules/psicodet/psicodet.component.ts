import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { PsicoterapiaService } from 'src/app/services/psicoterapia.service';
import { Psicoterapia } from '../interfaces/psicoterapia';

@Component({
  selector: 'app-psicodet',
  templateUrl: './psicodet.component.html',
  styleUrls: ['./psicodet.component.css']
})
export class PsicodetComponent implements OnInit {

  pac_psicoterapia:Psicoterapia=new Psicoterapia();
  constructor(
    public dialogRef:MatDialogRef<PsicodetComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    private service:PsicoterapiaService,
    public router: Router
  ) { }

  ngOnInit() {
    this.Session(this.paciente_id);
  }
  closeDialog(){
    this.dialogRef.close();
  }

  Session(paciente_id:number) {
    this.service.getSess(paciente_id).subscribe(
      pac_psicoterapia =>{
        this.pac_psicoterapia = pac_psicoterapia
        console.log(this.pac_psicoterapia);
      }
      );
  } 

}
