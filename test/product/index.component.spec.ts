import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../src/app/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../../src/app/components/components.module';
import { FormComponent } from '../../src/app/components/form/form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../src/environments/environment.development';
import { IndexComponent } from '../../src/app/product/index/index.component';
import { Product } from '../../src/app/classes/product';
import { ModalComponent } from '../../src/app/components/modal/modal.component';
import { By } from '@angular/platform-browser';
import { ContextMenuComponent } from '../../src/app/components/context-menu/context-menu.component';
import { EditComponent } from '../../src/app/product/edit/edit.component';
import { CreateComponent } from '../../src/app/product/create/create.component';



describe('Product/IndexComponent', () => {
  let service: ProductService;
  let fixture: ComponentFixture<IndexComponent>;
  let compiled: HTMLElement;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "create", component: CreateComponent },
          { path: "edit", component: EditComponent },
          { path: "**", redirectTo: "" }
        ]),
        HttpClientTestingModule,
        ComponentsModule
      ],
      declarations: [
        IndexComponent,
        ModalComponent,
        ContextMenuComponent
      ],
      providers:[
        ProductService
      ]
    }).compileComponents();
    
    service = TestBed.inject(ProductService);
    service.urlBase = environment.apiUrl;
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(IndexComponent);
    
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Se debe crear el Product/IndexComponent', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`Debe renderizar el  TableComponent'`, () => {
    const table = compiled.querySelector('app-table table');
    const th = table?.querySelectorAll('th');
    expect(th?.length).toBe(7);
  });

  it(`Debe obtener productos'`, () => {

    const component = fixture.componentInstance;
    
    fixture.detectChanges();

    const request = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect( request.request.method ).toBe('GET');
    request.flush( [] );

  });
  it(`Debe filtrar productos'`, () => {
    const param = "abc123";
    fixture.componentInstance.products = [{
      id: 'abc123', name: 'abc123', logo: 'abc123', date_release: '2010-10-10', date_revision: '2010-10-10', description: 'abc123'
    }]
    fixture.detectChanges();
    jest.spyOn(fixture.componentInstance, 'onFilterUpdate');    
    fixture.componentInstance.onFilterUpdate(param);
    
    expect(fixture.componentInstance.onFilterUpdate).toHaveBeenCalledWith(param);

  });
  it(`Debe llamar a addProduct'`, () => {    
    jest.spyOn(fixture.componentInstance, 'addProduct');
    fixture.componentInstance.addProduct();
    expect(fixture.componentInstance.addProduct).toHaveBeenCalledTimes(1);
  })
  it(`Debe llamar a updateProduct'`, () => {    
    jest.spyOn(fixture.componentInstance, 'updateProduct');
    fixture.componentInstance.updateProduct(new Product('','','','','',''));
    expect(fixture.componentInstance.updateProduct).toHaveBeenCalledTimes(1);
  })
  it(`Debe llamar a deleteProduct'`, () => { 

    const modalDebugComponent = fixture.debugElement.query(By.directive(ModalComponent));
    const modalComponent: ModalComponent = modalDebugComponent.componentInstance;
    fixture.componentInstance.deleteProduct(new Product('','','','','',''));
    fixture.detectChanges();
    jest.spyOn(service, 'deleteProduct');
    modalComponent.onConfirm();
    expect(service.deleteProduct).toHaveBeenCalledTimes(1);
  })


  it(`Debe llamar a modal close'`, () => { 
    const modalDebugComponent = fixture.debugElement.query(By.directive(ModalComponent));
    const modalComponent: ModalComponent = modalDebugComponent.componentInstance;
    fixture.componentInstance.deleteProduct(new Product('','','','','',''));
    fixture.detectChanges();
    jest.spyOn(fixture.componentInstance.modalSettings, 'close');
    modalComponent.onCancel();
    expect(fixture.componentInstance.modalSettings.close).toHaveBeenCalledTimes(1);
  })

  it(`Debe llamar ejecutar action edit contextMenu'`, () => { 
    const contextMenuDebugComponent = fixture.debugElement.query(By.directive(ContextMenuComponent));
    const contextMenuComponent: ContextMenuComponent = contextMenuDebugComponent.componentInstance;    
    fixture.detectChanges();
    jest.spyOn(fixture.componentInstance, 'updateProduct');
    contextMenuComponent.executeCallBack(
      fixture.componentInstance.context.items[0]
    );
    expect(fixture.componentInstance.updateProduct).toHaveBeenCalledTimes(1);
  })
  it(`Debe llamar ejecutar action delete contextMenu'`, () => { 
    const contextMenuDebugComponent = fixture.debugElement.query(By.directive(ContextMenuComponent));
    const contextMenuComponent: ContextMenuComponent = contextMenuDebugComponent.componentInstance; 
    fixture.componentInstance.context.data = {name: 'test'};
    fixture.detectChanges();
    jest.spyOn(fixture.componentInstance, 'deleteProduct');
    contextMenuComponent.executeCallBack(
      fixture.componentInstance.context.items[1]
    );
    expect(fixture.componentInstance.deleteProduct).toHaveBeenCalledTimes(1);
  })

});
