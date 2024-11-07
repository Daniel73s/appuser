import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { MapaComponent } from '../../modals/mapa/mapa.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent {
  private id_pedido!: string;
  public pedido: any;
  constructor(private modalCtrl: ModalController,
    private ActivateRouted: ActivatedRoute,
    private _pedidos: PedidosService,
    private toastCtrl: ToastController,
    private router: Router,
    private alertCtrl: AlertController) { }

  ionViewWillEnter() {
    this.id_pedido = this.ActivateRouted.snapshot.params['id_pedido'];
    this.getInfoPedido(this.id_pedido);
  }

  public async abrir_mapa(lng: number, lat: number) {
    const modal = await this.modalCtrl.create({
      component: MapaComponent,
      componentProps: {
        lng,
        lat
      }
    });
    await modal.present();
  }

  private getInfoPedido(id_pedido: string) {
    this._pedidos.getInformacionPedido(id_pedido).then((resp: any) => {
      this.pedido = resp;
    }).catch((e: any) => {
      console.log(e);
    })
  }

  public entregarPedido(id_pedido: string) {
    this._pedidos.modEstadoPedido(id_pedido, 'entregado').then((resp: any) => {
      this.mensaje(resp.mensaje, 'success', 3000);
      this.router.navigate(['/dashboard/historial/', this.pedido.id_proveedor]);
    }).catch((e: any) => {
      this.mensaje('ocurrio un error al entregar el pedido', 'danger', 3000);
    })
  }

  private async mensaje(message: string, color: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'top'
    });
    toast.present();
  }

  async alerta(id_pedido:string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '¿ Esta seguro de entregar el pedido ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.entregarPedido(id_pedido);
          }
        }
      ]
    });

    await alert.present();
  }
}
