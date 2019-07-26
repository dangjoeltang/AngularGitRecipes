import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SandboxRoutingModule } from './sandbox-routing.module';

@NgModule({
	declarations: [SandboxComponent],
	imports: [CommonModule, SharedModule, SandboxRoutingModule],
})
export class SandboxModule {}
