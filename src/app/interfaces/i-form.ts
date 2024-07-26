import { IFormField } from "./i-form-field";

export interface IForm {
    
    formFields: IFormField[];

    getFormField(name: string): IFormField;
    
    getCreationFormFields() :IFormField[];

    getUpdateFormFields() :IFormField[];
}
