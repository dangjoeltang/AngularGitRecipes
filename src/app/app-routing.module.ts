import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent,
	},
	{
		path: 'auth',
		loadChildren: './auth/auth.module#AuthModule',
	},
	{
		path: 'profile',
		loadChildren: './profile/profile.module#ProfileModule',
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
