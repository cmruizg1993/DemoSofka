import { Component } from '@angular/core';
import { IFormField } from '../../interfaces/i-form-field';
import { IFormButton } from '../../interfaces/i-form-button';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { IProduct } from '../../interfaces/i-product';
import { Router } from '@angular/router';
import { ModalSettings } from '../../classes/modal-settings';
import { ProductForm } from '../../classes/product-form';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  errorMessage = '';
  error = false;
  fields: IFormField[];
  buttons: IFormButton[];
  modalSettings: ModalSettings;
  constructor(
    public productService: ProductService,
    private router: Router
  ){

    const product: IProduct = this.router.getCurrentNavigation()?.extras.state as IProduct;

    if(!product)
      router.navigate(['/'])

    const productForm = new ProductForm(product, productService);

    this.fields = productForm.getUpdateFormFields();

    this.buttons = [

      {
        label: 'Actualizar',
        primary: true,
        validForm: true,
        submit: true
      }
    ]
    this.modalSettings = new ModalSettings();
  }
  async updateProduct(product: IProduct){
    
    this.error = false;
    this.modalSettings.cancelButton = false;
    this.modalSettings.confirmButton = true;
      
    try{      
      await this.productService.editProduct(product);
      this.modalSettings.content = `El  producto se ha actualizado correctamente.`;
      this.modalSettings.confirmAction = () => this.router.navigate(['/']);
      this.modalSettings.open();
    }catch(e: any){
      this.error = true;
      this.errorMessage = e.message;
      this.modalSettings.content = `Hubo un error al actualizar el producto.`;
      this.modalSettings.confirmButtonLabel = 'Aceptar';
      this.modalSettings.confirmAction = () => {
        this.modalSettings.close();
      }
    }finally{
      this.modalSettings.open();
    }
  }
}
