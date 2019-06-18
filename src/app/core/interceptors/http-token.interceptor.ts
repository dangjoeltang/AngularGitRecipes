import { Injectable, Injector } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	constructor(private jwtService: JwtService, private jwtHelper: JwtHelperService, private router: Router, private userService: UserAuthService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const headersConfig = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		};

		const token = this.jwtService.getToken();

		if (token) {
			if (this.jwtHelper.isTokenExpired(token)){
				console.log('jwt expired, redirecting');
				this.userService.purgeAuth();
				this.router.navigateByUrl('/auth');
			}
			headersConfig['Authorization'] = `Bearer ${token}`;
		}
		const request = req.clone({ setHeaders: headersConfig });
		return next.handle(request);
	}
}
