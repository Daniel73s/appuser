import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { UploadsService } from 'src/app/services/uploads.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit{
  private id_producto: string = '';
  private selectedFile!: File;
  public url: string = '';
  public lasturl: string = '';
  private loading: any;
  public formUpdateProducto!: FormGroup;
  public categorias:any[]=[];
  private id_proveedor:string='';
  constructor(private ActivatedRoute: ActivatedRoute,
    private _productos: ProductosService,
    private _uploads: UploadsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private _storage: StorageService,
    private fb: FormBuilder,
    private _categorias: CategoriasService) { }


    ngOnInit(){
      this.formInit();
    }
    ionViewWillEnter() {
      this.id_producto = this.ActivatedRoute.snapshot.params['id'];
      this.getCategorias(); 
      this.getProducto(this.id_producto);
      this._storage.getDataUser().then((resp: any) => {
        this.id_proveedor=resp.id_proveedor;
      })
  }

  private formInit() {
    this.formUpdateProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      precio_unitario: ['', [Validators.required, Validators.min(1)]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      medida: [''],
      unidad_medida: [''],
      id_categoria: ['']
    })
  }


  private getProducto(id: string) {
    this._productos.getProductoById(id).then((resp: any) => {
      console.log(resp);
      this.url = resp.imagen;
      this.lasturl = resp.imagen;
      this.formUpdateProducto.patchValue({
        nombre: resp.nombre,
        precio_unitario: resp.precio_unitario,
        tipo: resp.tipo,
        descripcion: resp.descripcion,
        medida: resp.medida,
        unidad_medida: resp.unidad_medida,
        id_categoria: resp.id_categoria
      });
    }).catch((error) => console.log(error))
  }

  public handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.url = URL.createObjectURL(this.selectedFile);
  }

  public actualizarImagen() {
    if(this.selectedFile){
      this.loadingComponent();
      const id_imagen = this.getIdImage(this.lasturl);
      this._uploads.updateImageCloudinary(id_imagen, this.selectedFile).then((resp: any) => {
        this._productos.updateImage(this.id_producto, resp.url_image).then((resp: any) => {
          console.log(resp);
          this.mensaje(resp.mensaje, 'success');
          this.router.navigate(['/dashboard/productos/', this.id_proveedor]);
        }).catch(e => {
          console.log(e);
          this.mensaje('ocurrio un error inesperado al guardar los datos', 'danger');
        })
          .finally(() => {
            this.loading.dismiss();
          })
      }).catch((e: any) => {
        console.log('ocurrio este error', e);
        this.mensaje('ocurrio un error inesperado', 'danger');
      }).finally(() => {
        this.loading.dismiss();
      })
    }else{
      this.mensaje('Seleccione una imagen','danger');
    }

  }

  private getIdImage(url: string): string {
    const arrimagen = url.split('/');
    const nameimage = arrimagen[arrimagen.length - 1];
    const [id] = nameimage.split('.');
    return id
  }

  async loadingComponent() {
    this.loading = await this.loadingCtrl.create({
      message: 'Actualizando...',
      spinner: 'crescent'
    });
    await this.loading.present();
  }

  async mensaje(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }

  private getCategorias() {
      this._categorias.getCategoriasValidas().then((resp:any)=>{
          this.categorias=resp;
      })
  }

  public update() {
    const { nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria } = this.formUpdateProducto.getRawValue();
    this._productos.updateProducto(this.id_producto, {
      nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria
    }).then((resp: any) => {
      this.mensaje(resp.mensaje,'success');
    }).catch(e => {
      this.mensaje('ocurrio un error inesperado', 'danger');
      console.log(e.message)
    }).finally(() => {
      this.router.navigate(['/dashboard/productos',this.id_proveedor]);
    });
  }
}
