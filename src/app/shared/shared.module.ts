import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// Third Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMaterialModule } from '@ngx-formly/material';

// My Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { ShowIfAuthDirective } from './directives/show-if-auth.directive';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeFormComponent } from './forms/recipe-form/recipe-form.component';
import { FormlyChipsComponent } from './forms/recipe-chips/recipe-chips.component';

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
		FormlyChipsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		HttpClientModule,
		RouterModule,
		MatChipsModule,
		MatIconModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		FormlyMaterialModule,
		NgxSpinnerModule,
		FormlyModule.forRoot({
			types: [
				{
					name: 'chips',
					wrappers: ['form-field'],
					component: FormlyChipsComponent,
					defaultOptions: {
						defaultValue: [],
					},
				},
			],
			validationMessages: [
				{ name: 'required', message: 'This field is required' },
			],
		}),
		FormlyBootstrapModule,
	],
	exports: [
		CommonModule,
		FormsModule,
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
