import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { IHeader } from '../../interfaces/i-header';
import { IContextMenu } from '../../interfaces/i-context-menu';
import { Router } from '@angular/router';
import { ModalSettings } from '../../classes/modal-settings';
import { ProductTableInfo } from '../../classes/product-headers';
import { IProduct } from '../../interfaces/i-product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  error = false;
  errorMessage = '';
  products: Product[];
  filteredProducts: Product[];
  headers: IHeader[];
  context: IContextMenu;
  modalSettings: ModalSettings;
  constructor(
    private productService: ProductService,
    private router: Router
  ){
    this.products = [];
    this.filteredProducts = [];
    this.headers = ProductTableInfo.getHeaders();
    this.context = {
      items: [
        {
          label: 'Editar',
          action: (product: IProduct)=> this.updateProduct(product)
        },
        {
          label: 'Eliminar',
          action: (product: IProduct) => this.deleteProduct(product)
        }
      ]
    }
    this.modalSettings = new ModalSettings();

  }
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    try{
      this.products = await this.productService.getProducts();
      this.filteredProducts = this.products.slice();
    }catch(err: any){
      this.error = true;
      this.errorMessage = err.message
      //this.modalSettings = new ModalSettings();
      this.modalSettings.confirmButtonLabel = 'Aceptar';
      this.modalSettings.cancelButton = false;
      this.modalSettings.confirmButton = true;
      this.modalSettings.content = `No se pudo obtener los datos del servidor, por favor inténtalo más tarde.`;
      this.modalSettings.confirmAction = () =>  this.modalSettings.close();      
      this.modalSettings.open();
    }
  }
  onFilterUpdate(event: string){
    const parameter = event.toUpperCase();
    this.filteredProducts = this.products
    .filter( p => p.id.toUpperCase().indexOf(parameter) >= 0|| p.name.toUpperCase().indexOf(parameter) >= 0 ||p.description.toUpperCase().indexOf(parameter) >= 0 || p.date_release.toUpperCase().indexOf(parameter) >= 0 || p.date_revision.toUpperCase().indexOf(parameter) >= 0 );
  }
  addProduct(){
    this.router.navigate(['/create']);
  }
  updateProduct(data: IProduct): void{
    this.router.navigate(['/edit'], { state: data });
  }
  deleteProduct(data: IProduct){
    this.error = false;
    this.modalSettings.cancelButton = true;
    this.modalSettings.confirmButton = true;
    this.modalSettings.content = `Esta seguro que desea eliminar el producto "${data.name}"`;
    this.modalSettings.confirmAction = () => {
      this.productService.deleteProduct(data).then(()=> window.location.reload());
    }
    this.modalSettings.cancelAction = () => {
      this.modalSettings.close();
    }
    this.modalSettings.open();
  }
  
}
