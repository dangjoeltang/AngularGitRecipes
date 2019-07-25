import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

// Third Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TagInputModule } from 'ngx-chips';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// import { FileUploadModule } from 'ng2-file-upload';

// My Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { ShowIfAuthDirective } from './directives/show-if-auth.directive';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeFormComponent } from './forms/recipe-form/recipe-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MultiImgUploaderComponent } from './components/multi-img-uploader/multi-img-uploader.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';

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
		ConfirmDialogComponent,
		MultiImgUploaderComponent,
		SandboxComponent,
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
		DropzoneModule,
        // FileUploadModule,
        
	],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		NgbModule,
		NgxSpinnerModule,
		TagInputModule,

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
