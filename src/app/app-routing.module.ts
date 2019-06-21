import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { RecipeModule } from './recipe/recipe.module';

const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent,
	},
	{
		path: 'auth',
		loadChildren: () => AuthModule,
	},
	{
		path: 'profile',
		loadChildren: () => ProfileModule,
	},
	{
		path: 'recipes',
		loadChildren: () => RecipeModule,
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
