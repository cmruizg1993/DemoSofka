
import { IForm } from "../interfaces/i-form";
import { IFormField } from "../interfaces/i-form-field";

export abstract class FormFactory implements IForm{
  
  formFields: IFormField[] = [];

  getFormField(name: string): IFormField {
    let field = this.formFields.find( f => f.name == name );
    
    if(!field)
      field = {
        name
      };
    return field;
  }
  getCreationFormFields(): IFormField[] {
    throw new Error("Method not implemented.");
  }
  getUpdateFormFields(): IFormField[] {
    throw new Error("Method not implemented.");
  }
    
}
