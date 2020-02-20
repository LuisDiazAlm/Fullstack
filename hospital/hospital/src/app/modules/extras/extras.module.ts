import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Error404Component } from './404/error404/error404.component';
import { Error500Component } from './500/error500/error500.component';
import { ExtrasRoutes } from './extras.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [Error404Component, Error500Component, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ExtrasRoutes),
  ]
})
export class ExtrasModule { }
