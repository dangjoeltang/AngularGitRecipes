import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class UserAuthService {
	private currentUserSubject = new BehaviorSubject<User>({} as User);
	public currentUser = this.currentUserSubject
		.asObservable()
		.pipe(distinctUntilChanged());

	private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
	public isAuthenticated = this.isAuthenticatedSubject.asObservable();

	constructor(
		private apiService: ApiService,
		private jwtService: JwtService,
		private jwtHelper: JwtHelperService
	) {}

	// Verify JWT in localstorage with server & load user's info.
	// This runs once on application startup.
	populate() {
		let token = this.jwtService.getToken();
		// If JWT detected, attempt to get & store user's info
		if (token) {
			this.apiService.get('user').subscribe(
				data => {
					this.setAuth(token);
				},
				err => {
					this.purgeAuth();
				}
			);
		} else {
			// Remove any potential remnants of previous auth states
			this.purgeAuth();
		}
	}

	setAuth(token) {
		const payload = this.jwtHelper.decodeToken(token);
		// Save JWT sent from server in localstorage
		this.jwtService.saveToken(token);

		localStorage.setItem('user', JSON.stringify(payload));

		// Set current user data into observable
		this.currentUserSubject.next(payload);
		// Set isAuthenticated to true
		this.isAuthenticatedSubject.next(true);
	}

	purgeAuth() {
		// Remove JWT from localstorage
		this.jwtService.destroyToken();
		localStorage.removeItem('user');
		// Set current user to an empty object
		this.currentUserSubject.next({} as User);
		// Set auth status to false
		this.isAuthenticatedSubject.next(false);
	}

	attemptAuth(credentials): Observable<User> {
		return this.apiService.post('token/', credentials).pipe(
			map(data => {
				this.setAuth(data.access);
				return data;
			})
		);
	}

	registerAuth(userData): Observable<any> {
		return this.apiService.post('register/', userData).pipe(
			map(data => {
				return data;
			})
		);
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	// Update the user on the server (email, pass, etc)
	// update(user): Observable<User> {
	// 	return this.apiService.put('/user', { user }).pipe(
	// 		map(data => {
	// 			// Update the currentUser observable
	// 			this.currentUserSubject.next(data.user);
	// 			return data.user;
	// 		})
	// 	);
	// }
}
