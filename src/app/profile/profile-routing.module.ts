import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileResolver } from './profile-resolver.service';
import { ProfilePicUploadComponent } from './profile-pic-upload/profile-pic-upload.component';

const routes: Routes = [
	{
		path: 'upload',
		component: ProfilePicUploadComponent,
	},
	{
		path: ':profile_id',
		component: ProfileLayoutComponent,
		resolve: {
			profile: ProfileResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
