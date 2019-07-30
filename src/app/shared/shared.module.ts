import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

// Third Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TagInputModule } from 'ngx-chips';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

// My Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowIfAuthDirective } from './directives/show-if-auth.directive';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeFormComponent } from './forms/recipe-form/recipe-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MultiImgUploaderComponent } from './components/multi-img-uploader/multi-img-uploader.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LoadingSpinnerDirective } from './directives/loading-spinner.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
	declarations: [
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		RecipeCardComponent,
		RecipeFormComponent,
		ConfirmDialogComponent,
		MultiImgUploaderComponent,
		LightboxComponent,
		SpinnerComponent,
		// Directives
		ShowIfAuthDirective,
		LoadingSpinnerDirective,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		HttpClientModule,
		RouterModule,
		NgxSpinnerModule,
		TagInputModule,
		ToastrModule.forRoot({
			positionClass: 'inline',
		}),
		ToastContainerModule,
	],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		NgbModule,
		NgxSpinnerModule,
		TagInputModule,
		ToastrModule,
		ToastContainerModule,

		// Components
		NavbarComponent,
		NotFoundComponent,
		LandingPageComponent,
		FooterComponent,
		RecipeCardComponent,
		RecipeFormComponent,
		MultiImgUploaderComponent,
		LightboxComponent,
		SpinnerComponent,

		// Directives
		ShowIfAuthDirective,
		LoadingSpinnerDirective,
	],
	entryComponents: [SpinnerComponent],
})
export class SharedModule {}
