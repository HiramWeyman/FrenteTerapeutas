import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../../services/guards/login.guard';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { ReceiptComponent } from '../receipt/receipt.component';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';
import { DiscountComponent } from '../discount/discount.component';
import { ListausuarioComponent } from '../listausuario/listausuario.component';
import { NewsComponent } from '../news/news.component';
import { NewformComponent } from '../news/newform/newform.component';
import { SettingsComponent } from '../settings/settings.component';
import { BannersComponent } from '../banners/banners.component';
import { BannerUploadComponent } from '../banners/banner-upload/banner-upload.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { FaqsformComponent } from '../faqs/faqsform/faqsform.component';
import { TeamComponent } from '../team/team.component';
import { TeamformComponent } from '../team/teamform/teamform.component';
import { ServicesComponent } from '../services/services.component';
import { ServicesformComponent } from '../services/servicesform/servicesform.component';
import { PagosSiiaService } from 'src/app/services/services.index';
import { PagossiiaComponent } from '../pagossiia/pagossiia.component';
import { RecepcionRecibosComponent } from '../recepcion-recibos/recepcion-recibos.component';
import { DatosaspiComponent } from '../datosaspi/datosaspi.component';
import { ExpdigitalComponent } from '../expdigital/expdigital.component';
import { TablaaspiComponent } from '../tablaaspi/tablaaspi.component';
import { ActaspiComponent } from '../actaspi/actaspi.component';
import { PagosComponent } from '../pagos/pagos.component';
import { PagosformComponent } from '../pagos/pagosform/pagosform.component';
import { UploadfileComponent } from '../pagos/uploadfile/uploadfile.component';
import { PacientesComponent } from '../pacientes/pacientes.component';
import { DatospacienteComponent } from '../datospaciente/datospaciente.component';
import { ConstefamComponent } from '../constefam/constefam.component';
import { HistoriaComponent } from '../historia/historia.component';
import { MentalComponent } from '../mental/mental.component';
import { SimismoComponent } from '../simismo/simismo.component';
import { MaritalesComponent } from '../maritales/maritales.component';
import { EscolaridadComponent } from '../escolaridad/escolaridad.component';
import { PsicoterapiaComponent } from '../psicoterapia/psicoterapia.component';
import { ExpclinicoComponent } from '../expclinico/expclinico.component';
import { PacinactivosComponent } from '../pacinactivos/pacinactivos.component';
import { PacdiagComponent } from '../pacdiag/pacdiag.component';

const pagesRoutes: Routes = [
	{
		path: '',
		component: DefaultComponent,
		//canActivate: [ LoginGuard ],
		children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'posts', component: PostsComponent },
			{ path: 'recibos', component: ReceiptComponent },
			{ path: 'shoppingcart', component: ShoppingcartComponent },
			{ path: 'descuentos', component: DiscountComponent },
			{ path: 'listausuario', component: ListausuarioComponent },
			{ path: 'noticias', component: NewsComponent },
			{ path: 'noticiasform/:id/:acc', component: NewformComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'banners', component: BannersComponent },
			{ path: 'bannersUpload/:id/:acc', component: BannerUploadComponent },
			{ path: 'faqs', component: FaqsComponent },
			{ path: 'faqsform/:id/:acc', component: FaqsformComponent },
			{ path: 'team', component: TeamComponent },
			{ path: 'teamform/:id/:acc', component: TeamformComponent },
			{ path: 'services', component: ServicesComponent },
			{ path: 'servicesform/:id/:acc', component: ServicesformComponent },
			{ path: 'pagossiia', component: PagossiiaComponent },	
			{ path: 'recepcionrecibos', component: RecepcionRecibosComponent },
			{ path: 'datosaspi', component: DatosaspiComponent },
			{ path: 'expdigital/:id_aspi/:id_conv/:desc', component: ExpdigitalComponent },
			{ path: 'tablaaspi', component: TablaaspiComponent },
			{ path: 'actaspi', component: ActaspiComponent },
			{ path: 'pagos/:id_aspi/:id_conv/:desc', component: PagosComponent},
			{ path: 'pagosform', component: PagosformComponent},
			{ path: 'uploadfile', component: UploadfileComponent},
			{ path: 'pacientes', component: PacientesComponent},
			{ path: 'datospaciente', component: DatospacienteComponent},
			{ path: 'constefam/:paciente_id', component: ConstefamComponent},
			{ path: 'historia/:paciente_id', component: HistoriaComponent},
			{ path: 'mental/:paciente_id', component: MentalComponent},
			{ path: 'simismo/:paciente_id', component: SimismoComponent},
			{ path: 'maritales/:paciente_id', component: MaritalesComponent},
			{ path: 'escolaridad/:paciente_id', component: EscolaridadComponent},
			{ path: 'psicoterapia/:paciente_id', component: PsicoterapiaComponent},
			{ path: 'expclinico', component: ExpclinicoComponent},
			{ path: 'pacinactivos', component: PacinactivosComponent},
			{ path: 'pacdiag', component: PacdiagComponent},

			
		]
	}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
