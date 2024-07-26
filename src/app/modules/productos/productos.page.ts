import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from './services/proveedores.service';
import { AlertController, IonRefresher, ToastController } from '@ionic/angular';
import { ProductosService } from './services/productos.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {

  private id: string = '';
  public productos: any[] = [];
  public estado: string = 'todos';
  @ViewChild('refresh') refresh!: IonRefresher;
  constructor(private router: Router,
    private RouteActivated: ActivatedRoute,
    private _proveedor: ProveedoresService,
    private alertCtrl: AlertController,
    private _productos: ProductosService,
    private toastCtrl: ToastController) { }

  ionViewWillEnter() {
    this.id = this.RouteActivated.snapshot.params['id'];
    this.getProductos(this.id);
  }

  public detalle_producto(id: string) {
    this.router.navigate(['/dashboard/productos/detalle', id])
  }
  private getProductos(id: string) {
    this._proveedor.getProductosProveedor(id).then((resp: any) => {
      this.productos = resp;
    }).catch((e: any) => { console.log(e) })
  }

  public filtrarProducto(e: any) {
    this.estado = e.detail.value;
  }

  public adicionarProducto() {
    this.router.navigate(['/dashboard/productos/addproducto']);
  }

  handleRefresh(event: any) {
    console.log(event);
    this._proveedor.getProductosProveedor(this.id).then((resp: any) => {
      this.productos = resp;
      console.log(this.productos);
    }).catch((e: any) => { console.log(e) })
      .finally(() => {
        this.refresh.complete();
      })
  }


  async AlertConfirm(id: string, accion: string) {
    const titulo = (accion === 'activo') ? "Habilitar" : "Deshabilitar";
    const message = (accion === 'activo') ? "¿ Esta seguro de habilitar producto ?" : "¿ Esta seguro de Deshabilitar el producto ?";
    const alert = await this.alertCtrl.create({
      header: titulo,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: "Aceptar",
          handler: () => {
            //Realizar la accion para cambiar de estado al proveedor
            console.log(id, accion);
            this._productos.updateEstadoProducto(id, accion).then((resp: any) => {
              this.mensaje(resp.mensaje, 'success', 3000);
              this.getProductos(this.id);
            }).catch((e: any) => {
              console.log(e.message);
              this.mensaje('ocurrio un error al cambiar el estado del producto', 'danger', 3000);
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async mensaje(message: string, color: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'top'
    });
    toast.present();
  }
}
