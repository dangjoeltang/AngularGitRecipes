import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	constructor(private apiService: ApiService) {}

	getAllRecipes(): Observable<any> {
		return this.apiService.get(`recipes/`);
	}

	getUserRecipes(profileId): Observable<any> {
		return this.apiService.get(`recipes/?profile=${profileId}`);
	}
}
