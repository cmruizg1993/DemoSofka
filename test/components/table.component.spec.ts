import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from '../../src/app/components/table/table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PagerComponent } from '../../src/app/components/pager/pager.component';
import { SelectComponent } from '../../src/app/components/select/select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IHeader } from '../../src/app/interfaces/i-header';
import { IContextMenu } from '../../src/app/interfaces/i-context-menu';



describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TableComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el componente', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  it(`Debe coincidir con el snapshot'`, () => {
    expect(compiled).toMatchSnapshot();
  });
  it(`Debe obtener Cell Value'`, () => {
    const header: IHeader = {
      key: 'test',
      label: 'Test'
    };
    const cellValue = 'Testing cell value';
    fixture.componentInstance.data = [{test: cellValue}];
    fixture.componentInstance.headers = [header];
    fixture.detectChanges();
    const result = fixture.componentInstance.getCellValue(0, header);
    expect(result).toMatch(cellValue);

  });
  it(`Debe ejecutar el context menu'`, () => {
    const context: IContextMenu = {
      items: [

      ]
    };
    fixture.componentInstance.context = context;
    const event = new MouseEvent('');
    
    fixture.detectChanges();
    
    jest.spyOn(fixture.componentInstance, 'openContextMenu');
    fixture.componentInstance.openContextMenu(event, null);
    expect(fixture.componentInstance.openContextMenu).toHaveBeenCalledTimes(1);
  });
})