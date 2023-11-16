import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Blog } from 'src/app/Shared/models/Data/blog';
import { BlogService } from 'src/app/Shared/services/requests/blog.service';

@Component({
  selector: 'ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

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
