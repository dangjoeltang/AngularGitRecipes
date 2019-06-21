import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeDetail } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RecipeResolver implements Resolve<RecipeDetail> {
	constructor(private api: ApiService, private router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> {
		return this.api
			.get(`recipes/${route.params['recipe_id']}`)
			.pipe(catchError(err => this.router.navigateByUrl('/')));
	}
}
