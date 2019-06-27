import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';

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
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeFormComponent } from './forms/recipe-form/recipe-form.component';

@NgModule({
	declarations: [
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		AlertBannerComponent,
		RecipeCardComponent,
		// Directives
		ShowIfAuthDirective,
		RecipeFormComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgbModule,
		HttpClientModule,
		RouterModule,
		NgxSpinnerModule,
		// MatChipsModule,
		// MatIconModule,
		// MatAutocompleteModule,
		// MatFormFieldModule,
	],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		NgbModule,
		NgxSpinnerModule,

		// Components
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		AlertBannerComponent,
		RecipeCardComponent,
		RecipeFormComponent,

		// Directives
		ShowIfAuthDirective,
	],
})
export class SharedModule {}
