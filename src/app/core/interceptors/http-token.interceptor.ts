import { Injectable, Injector } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';

import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	constructor(
		private jwtService: JwtService,
		private jwtHelper: JwtHelperService,
		private router: Router,
		private userService: UserAuthService,
		private spinner: NgxSpinnerService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const headersConfig = {
			// 'Content-Type': 'application/json',
			// Accept: 'application/json',
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
			// headers: req.headers.set('Content-Type'),
			setHeaders: headersConfig,
		});

		this.showLoader();
		return next.handle(request).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						this.onEnd();
					}
				},
				(err: any) => {
					this.onEnd();
				}
			)
		);
	}

	private onEnd(): void {
		this.hideLoader();
	}
	private showLoader(): void {
		this.spinner.show();
	}
	private hideLoader(): void {
		this.spinner.hide();
	}
}
