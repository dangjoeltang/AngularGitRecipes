import { Injectable, Injector } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
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

		this.spinner.show();
		// return next.handle(request).pipe(
		// 	map(event => {
		// 		if (event instanceof HttpResponse) {
		// 			this.spinner.hide();
		// 		}
		// 		return event;
		// 	}),
		// 	catchError((err: any) => {
		// 		this.spinner.hide();
		// 		return Observable.throw(err);
		// 	})
		// );
		return next.handle(request).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						this.spinner.hide();
					}
				},
				(err: any) => {
					this.spinner.hide();
				}
			)
		);
	}
}
