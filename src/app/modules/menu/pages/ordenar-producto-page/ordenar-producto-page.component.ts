import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-ordenar-producto-page',
  templateUrl: './ordenar-producto-page.component.html',
  styleUrls: ['./ordenar-producto-page.component.scss'],
})
export class OrdenarProductoPageComponent implements OnInit {
  public cantidad: number = 0;
  public fecha_actual = new Date().toISOString();
  public horasPermitidas: number[] = [];
  private loading: any;
  private id_producto: string = '';
  public producto: any;
  public hora_inicio: any;
  public hora_fin: any;
  public fechas: any[] = [];
  constructor(private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private _productos: ProductosService) { }

  ngOnInit() {
    this.generarHoras();
    this.id_producto = this.routeActivate.snapshot.params['id'];
    console.log('llego', this.id_producto);
    this.getProducto(this.id_producto);
  }

  private generarHoras() {
    for (let i = 7; i <= 18; i++) {
      this.horasPermitidas.push(i);
    }
  }

  public aumentar() {
    if (this.cantidad <= 499) {
      this.cantidad++;
    } else {
      this.cantidad = 500;
      this.mensaje('No se puede pediar mas de 500 productos', 'alert-outline');
    }
  }

  public disminuir() {
    if (this.cantidad >= 1) {
      this.cantidad--;
    } else {
      this.mensaje('No se puede pediar menos de 0 productos', 'alert-outline');
    }
  }

  async mensaje(message: string, icon: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      icon,
      position: 'top'
    });
    toast.present();
  }

  public async alerta() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Notificacion',
      message: 'Esta seguro de realizar el pedido?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            if (this.cantidad <= 0 || this.hora_inicio == undefined || this.hora_fin == undefined || this.fechas.length <= 0) {
              this.mensaje('Faltan campos por llenar', 'warning-outline')
            } else {
              //datos para el detalle del pedido
              console.log('id_producto', this.producto.id_producto);
              console.log('cantidad', this.cantidad);

              //datos para el pedido
              console.log('hora inicio', this.hora_inicio);
              console.log('hora_fin', this.hora_fin);
              console.log('id_proveedor', this.producto.id_proveedor);
              console.log('id_colegio', 'falta');
              console.log('fechas', this.fechas);
              console.log('fecha de creacion', this.fecha_actual);
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async carga() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'dots'
    });
    await this.loading.present();
  }

  private getProducto(id: string) {
    this._productos.getOneProducto(id).then((resp: any) => {
      this.producto = resp;
      console.log(resp);
    }).catch(e => console.log)
  }

  public sethorainicio(e: any) {
    this.hora_inicio = e.detail.value;
  }

  public sethorafin(e: any) {
    this.hora_fin = e.detail.value;
  }

  public setfechas(e: any) {
    console.log(e.detail.value);
    this.fechas = e.detail.value;
  }
}
