import { Component, inject } from '@angular/core';
import { Blog } from 'src/app/Shared/models/Data/blog';
import { BlogService } from 'src/app/Shared/services/requests/blog.service';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogsComponent {
  private blogService = inject(BlogService);
  blogs : Blog[] = [];


  ngOnInit(){
    this.blogService.getAllBlogs().subscribe(
      resp  => {
        this.blogs = resp;
      }
    )
  }

}
