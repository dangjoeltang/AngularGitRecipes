import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { RecipeModule } from './recipe/recipe.module';
import { ExploreModule } from './explore/explore.module';
import { MultiImgUploaderComponent } from './shared/components/multi-img-uploader/multi-img-uploader.component';
import { SandboxComponent } from './shared/components/sandbox/sandbox.component';

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
		path: 'explore',
		loadChildren: () => ExploreModule,
	},
	{
		path: 'testing',
		component: SandboxComponent,
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
