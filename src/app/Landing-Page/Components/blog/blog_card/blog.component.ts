import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/Shared/models/Data/blog';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogCardComponent {

  @Input() blog! : Blog;

}
