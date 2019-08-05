import { Injectable, Injector } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';

import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	constructor(
		private jwtService: JwtService,
		private jwtHelper: JwtHelperService,
		private router: Router,
		private userService: UserAuthService,
		private spinner: NgxSpinnerService,
		private toastrService: ToastrService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const headersConfig = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};

		const token = this.jwtService.getToken();

		if (token) {
			if (this.jwtHelper.isTokenExpired(token)) {
				console.log('jwt expired, redirecting');
				this.userService.purgeAuth();
				this.router.navigateByUrl('/auth');
			}
			headersConfig['Authorization'] = `Bearer ${token}`;
		}
		const request = req.clone({
			setHeaders: headersConfig,
		});

		// this.spinner.show();

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMessage = '';
				if (error.error instanceof ErrorEvent) {
					// client-side error
					errorMessage = `Error: ${JSON.stringify(error.error)}`;
				} else {
					// server-side error
					errorMessage = `Error: ${JSON.stringify(error.error)}`;
					// errorMessage = `Error Code: ${error.status}\nMessage: ${
					// 	error.message
					// }\nError: ${JSON.stringify(error.error)}`;
				}
				return throwError(errorMessage);
			})
		);
	}
}
