import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';


export const ClientRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'list'
        }
      }
    ]
  }
];
