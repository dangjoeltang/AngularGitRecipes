import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe-resolver.service';

const routes: Routes = [
	{
		path: 'browse',
		component: RecipeListComponent,
	},
	{
		path: ':recipe_id',
		component: RecipeDetailComponent,
		resolve: {
			recipe: RecipeResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecipeRoutingModule {}