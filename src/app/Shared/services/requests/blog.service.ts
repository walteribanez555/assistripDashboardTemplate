import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog, BlogDto } from '../../models/Data/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  apiUrl : string = environment.apiUrl + '/blogs';

  constructor(
    private readonly http : HttpClient

  ) { }

  postNotification(image : FormData) :Observable<string>  {
    return this.http.post(this.apiUrl, image)
      .pipe(
        map( (data : any )=> data.imgUrl),
        catchError((data) => {
          console.log(data);
          throw new Error(data);
        })
      );
  }

  postBlog( blog : BlogDto) : Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }


  getAllBlogs() : Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getByIdBlog(id : string) : Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl,{ params: { id: id }});
  }


}
