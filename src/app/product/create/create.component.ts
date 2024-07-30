import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/i-product';
import { IFormField } from '../../interfaces/i-form-field';
import { Product } from '../../classes/product';
import { IFormButton } from '../../interfaces/i-form-button';
import { ModalSettings } from '../../classes/modal-settings';
import { Router } from '@angular/router';
import { ProductForm } from '../../classes/product-form';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  
  error = false;
  errorMessage = '';
  fields: IFormField[];
  buttons: IFormButton[];
  modalSettings: ModalSettings;

  constructor(
    public productService: ProductService,
    private router: Router
  ){
    const formProduct = new ProductForm(null, productService);
    this.fields = formProduct.getCreationFormFields();

    this.buttons = [
      {
        label: 'Reiniciar',
        reset: true
      },
      {
        label: 'Enviar',
        primary: true,
        validForm: true,
        submit: true
      }
    ]
    this.modalSettings = new ModalSettings();
  }
  async createProduct(product: IProduct){
    this.error = false;
    this.modalSettings.cancelButton = false;
    this.modalSettings.confirmButton = true;        
    try{
      await this.productService.createProduct(product);
      this.modalSettings.content = `El  producto se ha creado correctamente.`;
      this.modalSettings.confirmAction = () => {
        this.router.navigate(['/']);
      }
    }catch(e: any){
      this.errorMessage = e.message;
      this.modalSettings.content = `Hubo un error al crear el producto.`;
      this.modalSettings.confirmButtonLabel = 'Aceptar';
      this.modalSettings.confirmAction = () => {
        this.modalSettings.close();
      }
    }finally{
      this.modalSettings.open();
    }
    
  }
}


