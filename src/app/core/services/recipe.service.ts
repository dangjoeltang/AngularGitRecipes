import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class RecipeService {
	constructor(private apiService: ApiService) {}

	createNewRecipe(recipe_data): Observable<any> {
		return this.apiService.post('recipes/', recipe_data);
	}
}
