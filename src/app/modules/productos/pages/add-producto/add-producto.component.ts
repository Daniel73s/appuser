import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { CategoriasService } from '../../services/categorias.service';
import { UploadsService } from 'src/app/services/uploads.service';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss'],
})
export class AddProductoComponent implements OnInit {
  private id_proveedor!: string;
  public formAddProducto!: FormGroup;
  public categorias: any[] = [];
  public url!: string;
  private selectedFile!: File;
  private loadingRef: any;
  constructor(private _storage: StorageService,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private _categorias: CategoriasService,
    private loadingCtrl: LoadingController,
    private _uploads: UploadsService,
    private _productos: ProductosService,
    private router: Router) { }

  ionViewWillEnter() {
    this.getproveedorId();
    this.getCategorias();
  }

  ngOnInit() {
    console.log('se ejecuto');
    this.formInit();
  }

  private formInit() {
    this.formAddProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      precio_unitario: ['', [Validators.required, Validators.min(2), Validators.max(2)]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      medida: [''],
      unidad_medida: [''],
      id_categoria: ['']
    })
  }

  private getproveedorId() {
    this._storage.getDataUser().then((resp: any) => {
      this.id_proveedor = resp.id_proveedor;
      console.log(this.id_proveedor);
    }).catch(e => {
      console.log(e.message);
      this.mensaje('error al obtener datos del proveedor recarge la pagina', 'danger', 3000, 'top');
    });
  }

  public addProducto() {
    if (this.formAddProducto.valid) {
      if (this.selectedFile) {
        this.loading('Creando Producto');
        const { nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria } = this.formAddProducto.getRawValue();
        this._uploads.uploadImageCloudinary(this.selectedFile).then((imagen: any) => {
          this._productos.createProducto({
            nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria, imagen: imagen.url_image,estado:'inactivo'
          }).then((producto: any) => {
            this._productos.asignarProducto(producto.id_producto, this.id_proveedor)
              .then((resp: any) => {
                console.log(resp.mensaje);
                this.mensaje(resp.mensaje, 'success', 3000, 'top');
              }).catch(e => {
                console.log(e.message);
                this.mensaje('ocurrio un error al asignar el producto al proveedor', 'danger', 3000, 'top');
              }).finally(() => {
                this.formAddProducto.reset();
                this.loadingRef.dismiss();
                this.router.navigate([`/dashboard/productos/`,this.id_proveedor]);
              });
          }).catch((e: any) => {
            console.log(e.message);
            this.mensaje('Ocurrio un error inesperado al guardar datos del producto', 'danger', 3000, 'top');
          }).finally(() => {
            this.formAddProducto.reset();
            this.loadingRef.dismiss();
            this.router.navigate([`/dashboard/productos/`,this.id_proveedor]);
          });
        }).catch((e: any) => {
          console.log(e.message);
          this.mensaje('Ocurrio un error inesperado al subir la imagen', 'danger', 3000, 'top');
        }).finally(() => {
          this.formAddProducto.reset();
          this.loadingRef.dismiss();
          this.router.navigate([`/dashboard/productos/`,this.id_proveedor]);
        });
      } else {
        this.mensaje('Asegurese de subir una imagen', 'danger', 3000, 'top');
      }
    } else {
      this.mensaje('formulario no valido', 'danger', 3000, 'top');
    }
  }

  private getCategorias() {
    this._categorias.getCategoriasValidas().then((resp: any) => {
      this.categorias = resp;
    }).catch(e => {
      console.log(e.message);
      this.mensaje('ocurrio un error al cargar las categorias', 'danger', 3000, 'top');
    });
  }

  public handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.url = URL.createObjectURL(this.selectedFile);
  }

  async mensaje(message: string, color: string, duration: number, position: 'top' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position
    });
    toast.present();
  }

  async loading(message: string) {
    this.loadingRef = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      keyboardClose: true
    });
    await this.loadingRef.present();
  }
}
