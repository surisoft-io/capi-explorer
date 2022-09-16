import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateNewComponent } from './certificate-new/certificate-new.component';
import { CertificatesComponent } from './certificates/certificates';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListRoutesComponent } from './list-routes/list-routes.component';

const routes: Routes = [
  { path: 'list-routes', component: ListRoutesComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'certificate-new', component: CertificateNewComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
