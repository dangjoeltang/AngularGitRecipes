import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService
	]
})
export class CoreModule {}
