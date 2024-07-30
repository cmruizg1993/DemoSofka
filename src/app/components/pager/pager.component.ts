import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../classes/page';
import { PagerProperties } from '../../classes/page-properties';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.css'
})
export class PagerComponent {
  @Output() pagerUpdate =  new EventEmitter<PagerProperties>();
  @Input() dataLength = 0;
  
  pagerProperties = new PagerProperties();
  
  pages: Page[] = [];

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.dataLength > 0){
      const numberOfPages = Math.ceil(this.dataLength/this.pagerProperties.pageSize);
      this.pages = Array(numberOfPages).fill(null).map((x,i)=>{
        const page = new Page();
        page.number = i+1;
        page.isActive = i == 0 ;
        return page;
      });
      //console.log(this.pages)
    }
  }
  updatePage(page: Page){
    this.pagerProperties.page = page.number;
    this.updatePager();
  }
  updatePageSize(pageSize: number){
    this.pagerProperties.page = 1;
    this.pagerProperties.pageSize = pageSize;
    this.updatePager();
  }
  updatePager(){
    this.pagerUpdate.emit(this.pagerProperties);
  }
  
}


