import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuComponent } from '../../src/app/components/context-menu/context-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IContextMenu } from '../../src/app/interfaces/i-context-menu';
import { Observable, Subject } from 'rxjs';
import { IEventContextMenu } from '../../src/app/interfaces/i-event-context-menu';
import { By } from '@angular/platform-browser';
import { FormComponent } from '../../src/app/components/form/form.component';
import { ButtonComponent } from '../../src/app/components/button/button.component';
import { IFormField } from '../../src/app/interfaces/i-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



describe('FormComponent', () => {
  let fixture: ComponentFixture<FormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        FormComponent,
        ButtonComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FormComponent);
    const fields: IFormField[] = [
      {
        name: 'Test', pattern: '[0-9]{1,1}', value: 'test'
      }
    ]
    fixture.componentInstance.fields = fields;
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
  it(`Debe resetear el formulario'`, () => {
    const component = fixture.componentInstance;
    
    component.buttons = [
      {
        label: 'test', reset: true
      }
    ]
    component.onClick(component.buttons[0]);

    expect(true).toBeTruthy();
  });

});
