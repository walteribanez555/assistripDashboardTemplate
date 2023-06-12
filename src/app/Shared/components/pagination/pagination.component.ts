import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {




  @Input() currentPage: number = 1;
  @Input() total : number =0;
  @Input() limit : number = 20;
  @Output() changePage = new EventEmitter<number>();

  pages : number[] = [];
  lastPage : number = 1;


  onChangePage(page: number): void{
    this.changePage.emit(page);

  }

  ngOnInit(): void {
      const pagesCount = Math.ceil(this.total / this.limit);
      this.pages = this.range(1,pagesCount);
      this.lastPage = this.pages[this.pages.length - 1];
  }

  range(start: number , end:number): number[]{
    return [...Array(end).keys()].map((el) => el + start);
  }

  nextPage():void{
    if(this.currentPage < this.pages.length){
      this.currentPage++;
      this.onChangePage(this.currentPage);
    }
  }

  prevPage():void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.onChangePage(this.currentPage);
    }
  }

}
