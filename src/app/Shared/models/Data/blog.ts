export interface Blog{
   blog_id : number;
   post : string;
   titulo : string;
   descripcion : string,
   img_url : string,
   fecha_post : string,
}

export interface BlogDto extends Omit<Blog, 'blog_id'| 'fecha_post'> {

}
