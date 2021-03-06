import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe-resolver.service';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
	// {
	// 	path: '',
	// 	redirectTo: 'browse',
	// 	pathMatch: 'full',
	// },
	{
		path: '',
		component: RecipeListComponent,
	},
	{
		path: 'new',
		component: RecipeCreateComponent,
	},
	{
		path: ':recipe_id',
		component: RecipeDetailComponent,
		resolve: {
			recipe: RecipeResolver,
		},
	},
	{
		path: ':recipe_id/edit',
		component: RecipeEditComponent,
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
