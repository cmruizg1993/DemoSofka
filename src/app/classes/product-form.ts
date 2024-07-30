import { FormGroup } from "@angular/forms";
import { IForm } from "../interfaces/i-form";
import { IFormField } from "../interfaces/i-form-field";
import { ProductService } from "../services/product.service";
import { CustomValidators } from "./custom-validators";
import { Product } from "./product";
import { FormFactory } from "./formFactory";

export class ProductForm extends FormFactory{


    private productService: ProductService|null

    private product: Product|null;

    constructor(product: Product|null, productService: ProductService|null){
        super();
        this.productService = productService;
        this.product = product;
    }

    override getCreationFormFields(): IFormField[] {
        this.resetProductFormFields();
        if(!this.productService)
            throw new Error("Illegal invocation, productService not provided.");         
        this.getFormField("id")
                ?.asynValidators?.push(CustomValidators.productIDValidator(this.productService)); 
        console.log(this.getFormField("date_release"));  
        return this.formFields;
    }
    override getUpdateFormFields(): IFormField[] {        
        if(!this.product)
            throw new Error("Illegal invocation, product Object not provided.");
        this.resetProductFormFields();
        this.getFormField("id").value = this.product.id;
        this.getFormField("id").disabled = true;
        this.getFormField("name").value = this.product.name;
        this.getFormField("description").value = this.product.description;
        this.getFormField("logo").value = this.product.logo;
        this.getFormField("date_release").value = this.product.date_release;        
        this.getFormField("date_revision").value = this.product.date_revision;
        
        return this.formFields;
    }
    private resetProductFormFields(){
        this.formFields = [
            {
              name: 'id',
              label: 'ID',
              required: true,
              pattern: '^[A-Za-z0-9]{3,10}$',
              asynValidators: []
            },
            {
              name: 'name',
              label: 'Nombre',
              required: true,
              pattern: '^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]{5,100}$'
            },
            {
              name: 'description',
              label: 'Descripción',
              required: true,
              pattern: '^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]{10,100}$',
              female: true
            },
            {
              name: 'logo',
              label: 'Logo',
              required: true
            },
            {
              name: 'date_release',
              label: 'Fecha liberación',
              placeholder: 'yyyy-mm-dd',
              required: true,
              pattern: '^20[0-9]{2,2}-[01]{1,1}[0-9]{1,1}-[0123]{1,1}[0-9]{1,1}$',
              female: true,
              validators: [CustomValidators.productValidateDateFormat(), CustomValidators.productValidateDateValue()],
              onValidation: (value: string, form: FormGroup) =>
                { 
                  const control = form.get('date_revision');
                  const releaseDate = value.split('-');
                  control?.setValue(`${Number(releaseDate[0])+1}-${releaseDate[1]}-${releaseDate[2]}`);          
                }
            },
            {
              name: 'date_revision',
              label: 'Fecha revisión',
              disabled: true,
              required: true
            }
          ];
    }
}
