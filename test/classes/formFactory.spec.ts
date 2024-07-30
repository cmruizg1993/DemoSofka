import { FormFactory } from "../../src/app/classes/formFactory";
import { Page } from "../../src/app/classes/page";
import { ProductForm } from "../../src/app/classes/product-form";
import { IFormField } from "../../src/app/interfaces/i-form-field";

class TestForm extends FormFactory{
  override getCreationFormFields(): IFormField[] {
    return super.getCreationFormFields();
  }
  override getUpdateFormFields(): IFormField[] {
    return super.getUpdateFormFields();
  }
}
describe('Form Factory Class', () => {
  it('should create an instance', () => {
    const testForm = new TestForm();
    expect(testForm.getCreationFormFields().length).toBe(0);
    expect(testForm.getUpdateFormFields().length).toBe(0);
    expect(testForm.getFormField("test")).toBeTruthy();
  });
});

describe('Page Class', () => {
  it('should create an instance', () => {
    const testPage = new Page();
    expect(testPage).toBeTruthy();
  });
});

describe('Product Form Class', () => {
  it('shouldnt create an instance', () => {
    let error = '';
    const testproductForm = new ProductForm(null, null);
    expect(testproductForm).toBeTruthy();
    try{      
      expect(testproductForm.getCreationFormFields()).toBeFalsy();      
    }catch(err: any){
      error = err.message;
    }
    expect(error).toMatch('Illegal invocation, productService not provided.');
    
    try{      
      expect(testproductForm.getUpdateFormFields()).toBeFalsy();
    }catch(err: any){
      error = err.message;
    }
    expect(error).toMatch('Illegal invocation, product Object not provided.');
  });

});