import { AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../src/app/classes/custom-validators';
import { ProductService } from '../../src/app/services/product.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../src/environments/environment.development';
import { Observable } from 'rxjs';
//import { Product } from '../../src/app/classes/product';

describe('CustomValidators Class', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    service.urlBase = environment.apiUrl;
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('should create an instance', () => {
    expect(new CustomValidators()).toBeTruthy();
  });
  it('should be invalid value', () => {
    const control = new FormControl('2010-10-10'); 
    control.updateValueAndValidity()
    
    const validator = CustomValidators.productValidateDateValue();

    const errors: ValidationErrors|null = validator(control);

    const invalidDateValue = !!errors ? errors['invalidDateValue']:null;

    expect(invalidDateValue).toBeTruthy();
  });
  it('should be invalid date format', () => {
    const control = new FormControl('20-10-2020'); 
    control.updateValueAndValidity()
    
    const validator = CustomValidators.productValidateDateFormat();

    const errors: ValidationErrors|null = validator(control);

    const invalidDateFormat = !!errors ? errors['invalidDateFormat']:null;

    expect(invalidDateFormat).toBeTruthy();
  });
  it('should make a http request to verify id', () => {
    const id = '1234';
    const control = new FormControl(id); 
    control.updateValueAndValidity()
    
    const validator: AsyncValidatorFn = CustomValidators.productIDValidator(service);

    const validatorResult: Observable<ValidationErrors|null> = validator(control) as Observable<ValidationErrors|null>;
    validatorResult.subscribe(result => result);
    const request = httpMock.expectOne(`${environment.apiUrl}/products/verification/${id}`);
    expect( request.request.method ).toBe('GET');
    
  });
});
