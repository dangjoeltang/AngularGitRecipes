// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		// BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
