import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { IContextMenu } from '../../interfaces/i-context-menu';
import { IEventContextMenu } from '../../interfaces/i-event-context-menu';
import { PagerProperties } from '../../classes/page-properties';
import { IHeader } from '../../interfaces/i-header';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() headers: IHeader[] = [];
  @Input() context?: IContextMenu ;
  page = 1;
  pageSize = 5;
  view: any = [];

  showContextMenu$ = new Subject<IEventContextMenu>();

    
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.tableRefresh();
  }
  getCellValue(index: number, header: IHeader){
    let value = this.view[index][`${header.key}`];
    const isImage = header.isImage;
    return isImage ? `assets/img/${value}`: value
  }

  pagerUpdate(pagerProperties: PagerProperties){
    this.pageSize = pagerProperties.pageSize;
    this.page = pagerProperties.page;
    this.tableRefresh();
  }

  tableRefresh(){
    const start = this.pageSize*(this.page - 1);
    const end = start + this.pageSize
    this.view = this.data.slice(start, end);
  }
  openContextMenu(event: MouseEvent, item: any){
    if(this.context){
      this.context.data = item;
      this.showContextMenu$.next(
        {
          event: event,
          data: item
        }
      )
    }
  }

}
