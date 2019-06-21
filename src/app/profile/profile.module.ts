import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileStoryComponent } from './profile-story/profile-story.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';

@NgModule({
	declarations: [
		ProfileLayoutComponent,
		ProfileStoryComponent,
		ProfileContentComponent,
	],
	imports: [SharedModule, CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
