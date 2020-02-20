import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonLayoutComponent } from './modules/common-layout/common-layout.component';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';

const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'dashboard/home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'dashboard',
  //   redirectTo: 'dashboard/home',
  //   pathMatch: 'full'
  // },


  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: 'authorization',
  //       loadChildren: './modules/extras/extras.module#ExtrasModule'
  //     }
  //   ]
  // },
  
  {
    path: 'dashboard',
    // canActivate: [LoginGuardGuard, SupervisorGuard],
    // canActivateChild: [SupervisorGuard],
    component: CommonLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'client',
        loadChildren: './modules/client/client.module#ClientModule'
      },
      // {
      //   path: '**',
      //   loadChildren: './modules/extras/authentication.modules#AuthenticationModule'
      // }
    ]
  },
  // {
  //   path: '**',
  //   loadChildren: './modules/extras/authentication.modules#AuthenticationModule'
  // }


  // {
  //   path: '',
  //   component: AuthenticationLayoutComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren:
  //         './modules/extras/authentication.modules#AuthenticationModule'
  //     }
  //   ]
  // }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

