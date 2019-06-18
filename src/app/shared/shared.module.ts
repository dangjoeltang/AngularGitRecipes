import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

// Third Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';


@NgModule({
	declarations: [
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		AlertBannerComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		HttpClientModule,
		RouterModule,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		NgbModule,
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		AlertBannerComponent,
	],
})
export class SharedModule {}
