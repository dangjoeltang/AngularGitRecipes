import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileStoryComponent } from './profile-story/profile-story.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProfileRecipesComponent } from './profile-recipes/profile-recipes.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { ProfilePicUploadComponent } from './profile-pic-upload/profile-pic-upload.component';

@NgModule({
	declarations: [
		ProfileLayoutComponent,
		ProfileStoryComponent,
		ProfileContentComponent,
		ProfileRecipesComponent,
		ProfilePictureComponent,
		ProfilePicUploadComponent,
	],
	imports: [SharedModule, CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
