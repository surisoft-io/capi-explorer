import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './shared/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRoutesComponent } from './list-routes/list-routes.component';
import { CertificatesComponent } from './certificates/certificates';
import { CertificateNewComponent } from './certificate-new/certificate-new.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ListRoutesComponent,
    CertificatesComponent,
    CertificateNewComponent,
    DashboardComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }