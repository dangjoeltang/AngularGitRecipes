import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
	HttpClient,
	HttpParams,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private http: HttpClient, private jwtService: JwtService) {}

	private formatErrors(error: any) {
		return throwError(error.error);
	}

	get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
		return this.http.get(`${environment.api_url}${path}`, { params });
		// .pipe(catchError(this.errorHandler));
	}

	put(path: string, body: Object = {}): Observable<any> {
		return this.http.put(
			`${environment.api_url}${path}`,
			JSON.stringify(body)
		);
		// .pipe(catchError(this.errorHandler));
	}

	post(path: string, body: Object = {}): Observable<any> {
		return this.http.post(
			`${environment.api_url}${path}`,
			JSON.stringify(body)
		);
		// .pipe(catchError(this.errorHandler));
	}

	delete(path): Observable<any> {
		return this.http.delete(`${environment.api_url}${path}`);
		// .pipe(catchError(this.errorHandler));
	}
}
