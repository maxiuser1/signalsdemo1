import { Component, inject } from '@angular/core';
import { BlogStore } from '../blog-post/blog-post.store';
import { CommentsStore } from './comments.store';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  providers:[CommentsStore],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  store = inject(BlogStore);
  componentStore = inject(CommentsStore);
}
