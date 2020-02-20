import { Routes } from '@angular/router';
import { Error404Component } from './404/error404/error404.component';
import { Error500Component } from './500/error500/error500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Authentication Components

export const ExtrasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'login'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'login'
        }
      },
      {
        path: '400',
        component: Error404Component,
        data: {
          title: '404'
        }
      },
      {
        path: '500',
        component: Error500Component,
        data: {
          title: '500'
        }
      }
    ]
  }
];
