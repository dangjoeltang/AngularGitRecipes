import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { catchError } from 'rxjs/operators';
import { ProfileData } from '../core/models/profile.model';

@Injectable({
	providedIn: 'root',
})
export class ProfileResolver implements Resolve<ProfileData> {
	constructor(private api: ApiService, private router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> {
		return this.api
			.get(`profiles/${route.params['username']}`)
			.pipe(catchError(err => this.router.navigateByUrl('/')));
	}
}
