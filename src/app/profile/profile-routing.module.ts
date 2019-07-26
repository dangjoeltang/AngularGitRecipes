import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileResolver } from './profile-resolver.service';

const routes: Routes = [
	{
		path: ':profile_id',
		component: ProfileLayoutComponent,
		resolve: {
			profile: ProfileResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
