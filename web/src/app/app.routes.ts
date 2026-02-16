import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { ClientRegisterComponent } from './pages/client-register/client-register';
import { CarrierRegisterComponent } from './pages/carrier-register/carrier-register';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard';
import { ClientDashboardHomeComponent } from './pages/client-dashboard/client-dashboard-home';
import { CarrierDashboardComponent } from './pages/carrier-dashboard/carrier-dashboard';
import { CarrierDashboardHomeComponent } from './pages/carrier-dashboard/carrier-dashboard-home';
import { CarrierDashboardRequestsComponent } from './pages/carrier-dashboard/carrier-dashboard-requests';
import { CarrierDashboardProposalsComponent } from './pages/carrier-dashboard/carrier-dashboard-proposals';
import { CarrierDashboardPlansComponent } from './pages/carrier-dashboard/carrier-dashboard-plans';
import { CarrierDashboardSupportComponent } from './pages/carrier-dashboard/carrier-dashboard-support';
import { CarrierProposalFormComponent } from './pages/carrier-dashboard/carrier-proposal-form';
import { ClientBudgetRequestComponent } from './pages/client-budget-request/client-budget-request';
import { ClientBudgetsListComponent } from './pages/client-budgets-list/client-budgets-list';
import { ClientVirtualInspectionComponent } from './pages/client-virtual-inspection/client-virtual-inspection';
import { ClientInsuranceQuoteComponent } from './pages/client-insurance-quote/client-insurance-quote';
import { ClientOrganizerQuoteComponent } from './pages/client-organizer-quote/client-organizer-quote';
import { ClientPaymentComponent } from './pages/client-payment/client-payment';
import { ClientDashboardSupportComponent } from './pages/client-dashboard/client-dashboard-support';
import { AboutClickCargoComponent } from './pages/about-click-cargo/about-click-cargo';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'sobre-click-cargo', component: AboutClickCargoComponent },
	{ path: 'cadastro-cliente', component: ClientRegisterComponent },
	{ path: 'cadastro-transportadora', component: CarrierRegisterComponent },
	{
		path: 'dashboard-cliente',
		component: ClientDashboardComponent,
		children: [
			{ path: '', component: ClientDashboardHomeComponent },
			{ path: 'dados', component: ClientRegisterComponent },
			{ path: 'orcamento-novo', component: ClientBudgetRequestComponent },
			{ path: 'orcamentos', component: ClientBudgetsListComponent },
			{ path: 'pagamento/:offerId', component: ClientPaymentComponent },
			{ path: 'vistoria-virtual', component: ClientVirtualInspectionComponent },
			{ path: 'seguro', component: ClientInsuranceQuoteComponent },
			{ path: 'servicos-extras', component: ClientOrganizerQuoteComponent },
			{ path: 'suporte', component: ClientDashboardSupportComponent }
		]
	},
	{
		path: 'dashboard-transportadora',
		component: CarrierDashboardComponent,
		children: [
			{ path: '', component: CarrierDashboardHomeComponent },
			{ path: 'dados', component: CarrierRegisterComponent },
			{ path: 'pedidos', component: CarrierDashboardRequestsComponent },
			{ path: 'propostas', component: CarrierDashboardProposalsComponent },
			{ path: 'propostas/nova/:requestId', component: CarrierProposalFormComponent },
			{ path: 'planos', component: CarrierDashboardPlansComponent },
			{ path: 'suporte', component: CarrierDashboardSupportComponent }
		]
	},
	// Rotas legadas redirecionadas para dentro do dashboard do cliente,
	// garantindo que o menu lateral (incluindo hambúrguer em mobile) esteja sempre presente.
	{ path: 'cliente/orcamento/novo', redirectTo: 'dashboard-cliente/orcamento-novo', pathMatch: 'full' },
	{ path: 'cliente/orcamentos', redirectTo: 'dashboard-cliente/orcamentos', pathMatch: 'full' },
	{ path: 'cliente/orcamentos/pagamento/:offerId', redirectTo: 'dashboard-cliente/pagamento/:offerId', pathMatch: 'full' },
	{ path: 'cliente/vistoria-virtual', redirectTo: 'dashboard-cliente/vistoria-virtual', pathMatch: 'full' },
	{ path: 'cliente/seguro', redirectTo: 'dashboard-cliente/seguro', pathMatch: 'full' },
	{ path: 'cliente/personal-organizer', redirectTo: 'dashboard-cliente/servicos-extras', pathMatch: 'full' }
];
