import { Routes } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '2',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: BlogPostComponent,
  },
];
