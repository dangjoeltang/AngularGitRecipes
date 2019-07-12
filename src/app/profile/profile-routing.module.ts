import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileLayoutComponent,
		// children: [
		//     {
		//         path: '',
		//         component: RecipeTilesComponent
		//     }
		// ]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
