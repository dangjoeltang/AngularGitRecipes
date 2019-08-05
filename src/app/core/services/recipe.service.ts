import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class RecipeService {
	constructor(private apiService: ApiService) {}

	getAllRecipes(): Observable<any> {
		return this.apiService.get(`recipes/`);
	}

	createNewRecipe(recipe_data): Observable<any> {
		return this.apiService.post('recipes/', recipe_data);
	}

	updateRecipe(recipe_pk, recipe_data): Observable<any> {
		return this.apiService.put(`recipes/${recipe_pk}/`, recipe_data);
	}

	deleteRecipe(recipe_pk): Observable<any> {
		return this.apiService.delete(`recipes/${recipe_pk}/`);
	}
}
