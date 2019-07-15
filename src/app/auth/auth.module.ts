import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [LoginComponent, LogoutComponent, RegisterComponent],
	imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
