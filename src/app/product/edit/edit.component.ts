import { Component } from '@angular/core';
import { IFormField } from '../../interfaces/i-form-field';
import { IFormButton } from '../../interfaces/i-form-button';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { IProduct } from '../../interfaces/iproduct';
import { Router } from '@angular/router';
import { ModalSettings } from '../../classes/modal-settings';
import { ProductForm } from '../../classes/product-form';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  errorName = '';
  error = false;
  fields: IFormField[];
  buttons: IFormButton[];
  modalSettings: ModalSettings;
  constructor(
    public productService: ProductService,
    private router: Router
  ){

    const product: any = this.router.getCurrentNavigation()?.extras.state;
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
  updateProduct(product: IProduct){
    this.productService.editProduct(product)
    .then(value => {
      this.error = false;
      this.modalSettings.cancelButton = false;
      this.modalSettings.confirmButton = true;
      this.modalSettings.content = `El  producto se ha actualizado correctamente.`;
      this.modalSettings.confirmAction = () => {
        this.router.navigate(['/']);
      }
      this.modalSettings.open();
    })
    .catch(err => {
      this.errorName = err.name;
      this.error = true;
      this.modalSettings.cancelButton = false;
      this.modalSettings.confirmButton = true;
      this.modalSettings.content = `Hubo un error al crear el producto.`;
      this.modalSettings.confirmButtonLabel = 'Aceptar';
      this.modalSettings.confirmAction = () => {
        this.modalSettings.close();
      }
      this.modalSettings.open();
    });
  }
}
