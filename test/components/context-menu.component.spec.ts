import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuComponent } from '../../src/app/components/context-menu/context-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IContextMenu } from '../../src/app/interfaces/i-context-menu';
import { Observable, Subject } from 'rxjs';
import { IEventContextMenu } from '../../src/app/interfaces/i-event-context-menu';
import { By } from '@angular/platform-browser';



describe('AppComponent', () => {
  let fixture: ComponentFixture<ContextMenuComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ContextMenuComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ContextMenuComponent);
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
  it('Se debe crear la app', () => {
    const context: IContextMenu = {
        data: '',
        items: [
            {
                label: 'Editar',
                action: (data: any)=>{
                    console.log(data);
                }
            }
        ]
    }
    const showContextMenu$ = new Subject<IEventContextMenu>();
    const component = fixture.componentInstance;
    component.contextMenu = context;
    fixture.detectChanges();
    component.showContextMenu$ = showContextMenu$.asObservable();
    component.subscribeToContextMenu();
    const mouseEvt = new MouseEvent('click');
    component.open(mouseEvt, 'Pepito')
    fixture.detectChanges();

    const div = compiled.querySelector('.context-item');

    jest.spyOn(console, 'log');

    component.executeCallBack(context.items[0])
    
    expect(console.log).toHaveBeenCalledWith(context.data);

    expect(component).toBeTruthy();
  });

});
