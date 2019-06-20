import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

// Third Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

// My Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { ShowIfAuthDirective } from './directives/show-if-auth.directive';

@NgModule({
	declarations: [
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		AlertBannerComponent,
		ShowIfAuthDirective,
	],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		HttpClientModule,
		RouterModule,
		NgxSpinnerModule,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		NgbModule,
		NgxSpinnerModule,
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		AlertBannerComponent,
		ShowIfAuthDirective,
	],
})
export class SharedModule {}
