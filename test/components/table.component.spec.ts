import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from '../../src/app/components/table/table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PagerComponent } from '../../src/app/components/pager/pager.component';
import { SelectComponent } from '../../src/app/components/select/select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';



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
})