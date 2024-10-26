import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AccountsDashboardComponent } from './components/accounts-dashboard/accounts-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accounts',
    component: AccountsDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
