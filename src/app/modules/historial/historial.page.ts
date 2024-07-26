import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonCheckbox, IonSegment, ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage {
  private id_proveedor!: string;
  public pedidos: any[] = [];
  public fecha_entrega: string = '';
  public estado_pedido: string = 'todos';
  public pedidos_seleccionados: string[] = [];
  @ViewChild('checkeados') check!: IonCheckbox;
  @ViewChild('segment') segment!: IonSegment;
  constructor(private alertCtrl: AlertController,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    private _pedidos: PedidosService,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) { }

  ionViewWillEnter() {
    this.id_proveedor = this.ActivateRoute.snapshot.params['id_proveedor'];
    this.getPedidos(this.id_proveedor);
  }

  public async filtro() {
    const alert = await this.alertCtrl.create({
      header: 'Filtrar',
      message: 'Filtrar Pedidos por fecha',
      inputs: [
        {
          type: 'date',
          name: 'fecha_entrega',
          label: 'Fecha de inicioFecha de entrega',
          attributes: {
            fecha: new Date().toISOString().split('T')[0]
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: (e: any) => {
            console.log('Confirm Okay', e.fecha_entrega);
            this.pedidos_seleccionados = [];
            if (this.check) {
              this.check.checked = false;
            }
            this.fecha_entrega = e.fecha_entrega;
          }
        }
      ],

    });

    await alert.present();
  }

  public generarReporte(){
   console.log('Generar Reporte');
   
  }

  public detalle_pedido(id: string) {
    this.router.navigate(['/dashboard/historial/detalle-pedido', id])
  }

  private getPedidos(id_proveedor: string) {
    console.log('se mostraran los pedidos de ', id_proveedor);
    this._pedidos.getPedidoByProveedor(id_proveedor).then((resp: any) => {
      console.log(resp);
      this.pedidos = resp;
    }).catch((e: any) => {
      console.log(e);
    })
  }

  public filtrarporestado(e: any) {
    this.pedidos_seleccionados = [];
    this.estado_pedido = e.detail.value;
  }

  public addpedidoSeleccionado(e: any): void {
    console.log(e.detail.value);
    const { value, checked } = e.detail;

    if (checked) {
      this.pedidos_seleccionados.push(value);
    } else {
      this.pedidos_seleccionados = this.pedidos_seleccionados.filter(item => item !== value);
    }
  }

  public confirmar() {
    console.log(this.pedidos_seleccionados);

  }

  public async CambiarEstadoPedido() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Acciones',
      mode: 'md',
      backdropDismiss: false,
      subHeader: 'Seleccione cuidadosamente la accion ',
      // translucent:true,
      buttons: [
        {
          text: 'Confirmar Pedidos',
          handler: () => {
            console.log('los pedidos seran confirmados', this.pedidos_seleccionados);
            for (let i = 0; i < this.pedidos_seleccionados.length; i++) {
              this._pedidos.modEstadoPedido(this.pedidos_seleccionados[i], 'confirmado').then((resp) => {
                console.log(resp);
                this.getPedidos(this.id_proveedor);
              }).catch(e => {
                console.log(e);
                this.mensaje('ocurrio un error inesperado al modificar el estado del pedido','danger',3000);
              })
            }
            this.mensaje('Se confirmaron los pedidos','success',3000);
            this.reset('confirmado');
          }
        },
        {
          text: 'Rechazar Pedidos',
          cssClass: 'btn_danger',
          handler: () => {
            console.log('los pedidos seran rechazados', this.pedidos_seleccionados);
            for (let i = 0; i < this.pedidos_seleccionados.length; i++) {
              this._pedidos.modEstadoPedido(this.pedidos_seleccionados[i], 'rechazado').then((resp) => {
                console.log(resp);
                this.getPedidos(this.id_proveedor);
              }).catch(e => {
                console.log(e);
                this.mensaje('ocurrio un error inesperado al modificar el estado del pedido','danger',3000);
              })
            }
            this.mensaje('Se rechazaron los pedidos','success',3000);
            this.reset('rechazado');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  private reset(accion: string) {
    if (accion == 'confirmado') {
      this.segment.value = 'confirmado';
      this.estado_pedido = 'confirmado';
    } else {
      this.segment.value = 'rechazado';
      this.estado_pedido = 'rechazado';
    }
    this.pedidos_seleccionados = [];
    this.fecha_entrega = '';
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
