import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

//rutas
import { APP_ROUTING } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DefaultModule } from './modules/default/default.module';
import { ServicesModule } from './services/services.module';
import { ShoppingcartComponent } from './modules/shoppingcart/shoppingcart.component';
import { DiscountComponent } from './modules/discount/discount.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule,
         MatIconModule,
         MatToolbarModule,
         MatButtonModule,
         MatTableModule,
         MatDialogModule,
         MatCheckboxModule,
         MatListModule,
         MatExpansionModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { ListausuarioComponent } from './modules/listausuario/listausuario.component';
registerLocaleData(localeEsMx, 'es-Mx');
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {NgxPaginationModule} from 'ngx-pagination';
import { NewformComponent } from './modules/news/newform/newform.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { BannersComponent } from './modules/banners/banners.component';
import { BannerUploadComponent } from './modules/banners/banner-upload/banner-upload.component';
import { FaqsComponent } from './modules/faqs/faqs.component';
import { FaqsformComponent } from './modules/faqs/faqsform/faqsform.component';
import { TeamComponent } from './modules/team/team.component';
import { TeamformComponent } from './modules/team/teamform/teamform.component';
import { ServicesComponent } from './modules/services/services.component';
import { ServicesformComponent } from './modules/services/servicesform/servicesform.component';
import { PagossiiaComponent } from './modules/pagossiia/pagossiia.component';
import { RecepcionRecibosComponent } from './modules/recepcion-recibos/recepcion-recibos.component';
import { DialogBodyComponent } from "./shared/dialog-body/dialog-body.component";
import { DatosaspiComponent } from './modules/datosaspi/datosaspi.component';
import { ExpdigitalComponent } from './modules/expdigital/expdigital.component';
import { TablaaspiComponent } from './modules/tablaaspi/tablaaspi.component';
import { ActaspiComponent } from './modules/actaspi/actaspi.component';
import { PacientesComponent } from './modules/pacientes/pacientes.component';
import { DatospacienteComponent } from './modules/datospaciente/datospaciente.component';
import { ActpacComponent } from './modules/actpac/actpac.component';
import { DescpacComponent } from './modules/descpac/descpac.component';
import { MotivoconsComponent } from './modules/motivocons/motivocons.component';
import { SituacionactComponent } from './modules/situacionact/situacionact.component';
import { ConstefamComponent } from './modules/constefam/constefam.component';
import { HistoriaComponent } from './modules/historia/historia.component';
import { MentalComponent } from './modules/mental/mental.component';
import { SimismoComponent } from './modules/simismo/simismo.component';
import { MaritalesComponent } from './modules/maritales/maritales.component';
import { DesarrolloComponent } from './modules/desarrollo/desarrollo.component';
import { SocialesComponent } from './modules/sociales/sociales.component';
import { DiversionesComponent } from './modules/diversiones/diversiones.component';
import { EscolaridadComponent } from './modules/escolaridad/escolaridad.component';
import { RecuerdosComponent } from './modules/recuerdos/recuerdos.component';
import { DiagnosticoComponent } from './modules/diagnostico/diagnostico.component';
import { PsicoterapiaComponent } from './modules/psicoterapia/psicoterapia.component';
import { RecordtrabajoComponent } from './modules/recordtrabajo/recordtrabajo.component';
import { AjustesComponent } from './modules/ajustes/ajustes.component';
import { PsicoinsertComponent } from './modules/psicoinsert/psicoinsert.component';
import { PsicoactComponent } from './modules/psicoact/psicoact.component';
import { PsicodetComponent } from './modules/psicodet/psicodet.component';
import { DiagnosticoDetComponent } from './modules/diagnostico-det/diagnostico-det.component';
import { PacienteDetComponent } from './modules/paciente-det/paciente-det.component';
import { ExpclinicoComponent } from './modules/expclinico/expclinico.component';
import { MetodoevaluacionComponent } from './modules/metodoevaluacion/metodoevaluacion.component';
import { AddresultadoComponent } from './modules/addresultado/addresultado.component';
import { PacinactivosComponent } from './modules/pacinactivos/pacinactivos.component';
import { PacdiagComponent } from './modules/pacdiag/pacdiag.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingcartComponent,
    DiscountComponent,
    ListausuarioComponent,
    NewformComponent,
    SettingsComponent,
    BannersComponent,
    BannerUploadComponent,
    FaqsComponent,
    FaqsformComponent,
    TeamComponent,
    TeamformComponent,
    ServicesComponent,
    ServicesformComponent,
    PagossiiaComponent,
    RecepcionRecibosComponent,
    DatosaspiComponent,
    ExpdigitalComponent,
    TablaaspiComponent,
    ActaspiComponent,
    PacientesComponent,
    DatospacienteComponent,
    ActpacComponent,
    DescpacComponent,
    MotivoconsComponent,
    SituacionactComponent,
    ConstefamComponent,
    HistoriaComponent,
    MentalComponent,
    SimismoComponent,
    MaritalesComponent,
    DesarrolloComponent,
    SocialesComponent,
    DiversionesComponent,
    EscolaridadComponent,
    RecuerdosComponent,
    DiagnosticoComponent,
    PsicoterapiaComponent,
    RecordtrabajoComponent,
    AjustesComponent,
    PsicoinsertComponent,
    PsicoactComponent,
    PsicodetComponent,
    DiagnosticoDetComponent,
    PacienteDetComponent,
    ExpclinicoComponent,
    MetodoevaluacionComponent,
    AddresultadoComponent,
    PacinactivosComponent,
    PacdiagComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    SharedModule,
    DefaultModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    BlockUIModule.forRoot(),
    NgxPaginationModule,
    AngularEditorModule,
    AngularFileUploaderModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-MX' }, {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogBodyComponent,
    ActpacComponent,
    DescpacComponent,
    MotivoconsComponent,
    SituacionactComponent,
    DesarrolloComponent,
    RecuerdosComponent,
    DiversionesComponent,
    AjustesComponent,
    PsicoinsertComponent,
    PsicoactComponent,
    PsicodetComponent,
    DiagnosticoComponent,
    DiagnosticoDetComponent,
    PacienteDetComponent,
    MetodoevaluacionComponent,
    AddresultadoComponent
  ],
    
})
export class AppModule { }
