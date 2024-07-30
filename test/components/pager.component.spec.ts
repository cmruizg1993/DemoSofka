import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { PagerComponent } from '../../src/app/components/pager/pager.component';
import { SelectComponent } from '../../src/app/components/select/select.component';
import { FormsModule } from '@angular/forms';



describe('PagerComponent', () => {
  let fixture: ComponentFixture<PagerComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        PagerComponent,
        SelectComponent,        
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PagerComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el componente', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  it(`Debe coincidir con el snapshot`, () => {
    expect(compiled).toMatchSnapshot();
  });
  it(`Debe calcular el número de páginas`, () => {
    fixture.componentInstance.dataLength = 11;
    fixture.detectChanges();
    expect(fixture.componentInstance.pages.length).toEqual(3);
  });
  it(`Debe actualizar el número de página`, () => {
    fixture.componentInstance.dataLength = 11;
    fixture.detectChanges();
    fixture.componentInstance.updatePage(fixture.componentInstance.pages[1]);
    fixture.detectChanges();    
    expect(fixture.componentInstance.pagerProperties.page).toEqual(2);
  });
})