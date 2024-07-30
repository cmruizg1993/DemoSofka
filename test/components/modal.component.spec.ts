import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from '../../src/app/components/modal/modal.component';
import { ModalSettings } from '../../src/app/classes/modal-settings';



describe('AppComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ModalComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ModalComponent);
    fixture.componentInstance.modalSettings = new ModalSettings();
  
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
  it(`Debe llamar a onConfirm'`, () => {
    const confirmText = 'Confirm';
    const cancelText = 'Cancel';
    fixture.componentInstance.modalSettings.confirmAction = ()=> console.log(confirmText);
    fixture.componentInstance.modalSettings.cancelAction = ()=> console.log(cancelText);
    jest.spyOn(console, 'log');
    fixture.componentInstance.onConfirm();
    expect(console.log).toHaveBeenCalledWith(confirmText);
    
  });
  it(`Debe llamar a onCancel'`, () => {
    const confirmText = 'Confirm';
    const cancelText = 'Cancel';
    fixture.componentInstance.modalSettings.confirmAction = ()=> console.log(confirmText);
    fixture.componentInstance.modalSettings.cancelAction = ()=> console.log(cancelText);
    jest.spyOn(console, 'log');
    fixture.componentInstance.onCancel();
    expect(console.log).toHaveBeenCalledWith(cancelText);
  })
    
});
  