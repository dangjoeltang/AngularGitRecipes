import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

@NgModule({
	declarations: [RecipeListComponent, RecipeDetailComponent],
	imports: [SharedModule, CommonModule, RecipeRoutingModule],
})
export class RecipeModule {}
