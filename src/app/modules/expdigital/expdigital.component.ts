import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { PagosService } from '../../services/pagos.service';

@Component({
  selector: 'app-expdigital',
  templateUrl: './expdigital.component.html',
  styleUrls: ['./expdigital.component.scss']
})
export class ExpdigitalComponent implements OnInit {

  id_aspi: number;
  id_conv: number;
  desc: string;
  docs: any; 

  p: number = 1;

  private subscription: Subscription;

  constructor( private activatedRoute: ActivatedRoute, private _ps: PagosService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id_aspi = params['id_aspi'];
      this.id_conv = params['id_conv'];
      this.desc = params['desc'];
      console.log('id_aspi: '+this.id_aspi);
      console.log('id_conv: '+this.id_conv);
      console.log('desc: '+this.desc);
      
      if (this.id_aspi != 0){
        this.subscription = this._ps.getDocumento(this.id_conv).subscribe(
          (docs) => {
            this.docs = docs;
            //console.log(this.docs);
          }
        )
      }

    })
  }

}
