import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { RecipeModule } from './recipe/recipe.module';
import { ExploreModule } from './explore/explore.module';
import { SandboxModule } from './sandbox/sandbox.module';

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
		path: 'recipes',
		loadChildren: './recipe/recipe.module#RecipeModule',
	},
	{
		path: 'explore',
		loadChildren: './explore/explore.module#ExploreModule',
	},
	{
		path: 'sandbox',
		loadChildren: './sandbox/sandbox.module#SandboxModule',
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
