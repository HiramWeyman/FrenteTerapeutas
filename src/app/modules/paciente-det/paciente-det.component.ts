import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectModule } from '@angular/material';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Estados } from '../interfaces/estados';
import {Router} from '@angular/router';
import { Municipios } from '../interfaces/municipios';
import { Edocivil } from '../interfaces/edocivil';
import { Escolar } from '../interfaces/escolaridad';
import { Modalidad } from '../interfaces/modalidad';
import { Estatus } from '../interfaces/estatus';
import { Genero } from '../interfaces/genero';

import { PacienteDet } from '../interfaces/pacientedet';

@Component({
  selector: 'app-paciente-det',
  templateUrl: './paciente-det.component.html',
  styleUrls: ['./paciente-det.component.css']
})
export class PacienteDetComponent implements OnInit {
  estados: Estados[];
  mun:Municipios[];
  edocivil:Edocivil[];
  catescolar:Escolar[];
  estatus:Estatus[];
  modalidad:Modalidad[];
  genero:Genero[];
  fec1:String;
  paciente:PacienteDet=new PacienteDet();
  id:number;

  constructor(
    private service:PacientesService,
    public dialogRef:MatDialogRef<PacienteDetComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente_id:number,
    public router: Router,
  ) { }

  ngOnInit() {
    this.service.getPacientesDet(this.paciente_id).subscribe(
      paciente => {
        this.paciente = paciente;
        this.fec1=this.paciente.paciente_fec_nac.toString();
        this.fec1=this.fec1.substr(0, 10);
        this.paciente.paciente_fec_nac = this.convert(this.paciente.paciente_fec_nac);
        this.paciente.paciente_fec_ing = this.convert(this.paciente.paciente_fec_ing);
        console.log(this.paciente.paciente_fec_nac); 
        console.log(this.convert(this.paciente.paciente_fec_nac));
      }
      );
  }

  convert(str:string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  }


