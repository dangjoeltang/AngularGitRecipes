import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreLayoutComponent } from './explore-layout/explore-layout.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
	declarations: [ExploreLayoutComponent, RecipeListComponent],
	imports: [SharedModule, CommonModule, ExploreRoutingModule],
})
export class ExploreModule {}
