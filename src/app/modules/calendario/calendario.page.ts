import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonDatetime, ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  constructor(private _pedidos: PedidosService,
    private ActivatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router) { }

  private id_colegio: string = '';
  public pedidos_realizados: any[] = [];
  public pedido: any;
  @ViewChild('datetime') datetime!: IonDatetime;
  ionViewWillEnter() {
    this.id_colegio = this.ActivatedRoute.snapshot.params['id'];
    this.getPedidosColegio(this.id_colegio);
  }

  private getPedidosColegio(id_colegio: string) {
    this._pedidos.getfechasPedidos(id_colegio).then((resp: any) => {
      this.pedidos_realizados = resp.map((item: any) => {
        let colorFondo: string = '';
        switch (item.estado) {
          case 'pendiente':
            colorFondo = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-warning');
            break;
          case 'confirmado':
            colorFondo = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-success');
            break;
          case 'rechazado':
            colorFondo = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-danger');
            break;
          case 'entregado':
            colorFondo = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary');
            break;
          default:
            // Opcional: agregar un caso por defecto para manejar otros valores de estado
            break;
        }

        return {
          date: item.fecha_entrega.substr(0, 10),
          textColor: '#FFF',
          backgroundColor: colorFondo
        }
      });

      console.log(this.pedidos_realizados);
    }).catch((e: any) => {
      console.log(e.message);
    })
  }

  public getPedido(e: any) {
    this.pedido = undefined;
    console.log(e.detail.value);
    const date = e.detail.value;
    this._pedidos.getPedidoByColegioAndFechaEntrega(this.id_colegio, date)
      .then((resp: any) => {
        console.log(resp);
        this.pedido = resp;
      }).catch(e => {
        console.log(e.message);
      })

  }

  public async alerta(id_pedido: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Esta Seguro de eliminar Pedido',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this._pedidos.eliminarDetallePedido(id_pedido).then(() => {
              this._pedidos.eliminarPedido(id_pedido).then((resp: any) => {
                this.mensaje(resp.mensaje, 'success', 3000);
                this.pedido = undefined;
                this.datetime.reset();
                this.getPedidosColegio(this.id_colegio);
              }).catch((e: any) => {
                console.log(e);
                this.mensaje('error al eliminar el pedido', 'danger', 3000);
              })
            }).catch((e: any) => {
              console.log(e);
              this.mensaje('Ocurrio un error al eliminar el detalle del pedido', 'danger', 3000);
            })
          }
        }
      ]
    });

    await alert.present();
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

  public PedidoDetalle(id_pedido:string){
      this.router.navigate(['/dashboard/calendario/pedido-detalle',id_pedido]);
  }

}
