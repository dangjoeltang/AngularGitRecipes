import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreLayoutComponent } from './explore-layout/explore-layout.component';

const routes: Routes = [
	{
		path: '',
		component: ExploreLayoutComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ExploreRoutingModule {}
