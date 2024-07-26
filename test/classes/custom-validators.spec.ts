import { FormControl, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../src/app/classes/custom-validators';
//import { Product } from '../../src/app/classes/product';

describe('CustomValidators Class', () => {
 
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
  
});
