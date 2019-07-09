import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreLayoutComponent } from './explore-layout/explore-layout.component';

@NgModule({
	declarations: [ExploreLayoutComponent],
	imports: [SharedModule, CommonModule, ExploreRoutingModule],
})
export class ExploreModule {}
