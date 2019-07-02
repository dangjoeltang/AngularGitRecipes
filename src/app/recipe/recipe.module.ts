import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@NgModule({
	declarations: [RecipeListComponent, RecipeDetailComponent, RecipeEditComponent],
	imports: [SharedModule, CommonModule, RecipeRoutingModule],
})
export class RecipeModule {}
