import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BlogStore } from './blog-post.store';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterOutlet, CommentsComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit {
  
  store = inject(BlogStore);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('params', params);
      this.store.get(params['id']);
    });
  }

  goTo(id:string):void {
    this.router.navigate(['', id], { relativeTo: this.route});
  }
}
