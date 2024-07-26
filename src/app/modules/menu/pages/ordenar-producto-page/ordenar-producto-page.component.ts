import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonDatetime, LoadingController, ToastController } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ordenar-producto-page',
  templateUrl: './ordenar-producto-page.component.html',
  styleUrls: ['./ordenar-producto-page.component.scss'],
})
export class OrdenarProductoPageComponent {
  // public cantidad: number = 0;
  public fecha_actual = new Date().toISOString();
  private loading: any;
  private id_producto: string = '';
  public producto: any;
  public hora_inicio: any;
  public hora_fin: any;
  public fechas!: string[];
  public pedidos_realizados: any[] = [];
  private fechasBloqueadas: string[] = [];
  private id_colegio: string = '';
  private id_proveedor: string = '';
  private numEstudiantes!: number;
  public limite!: number;
  public nopermitido: string = '';
  public fechasNoValidas: string[] = [];

  constructor(private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private _productos: ProductosService,
    private _pedidos: PedidosService,
    private _storage: StorageService,
  ) { }

  ionViewWillEnter() {
    this.id_producto = this.routeActivate.snapshot.params['id'];
    this.getInfoColegio();
    this.getProducto(this.id_producto);
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

  public async alerta() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Alerta',
      message: 'Revise cuidadosamente antes de realizar el pedido',
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
            if (this.hora_inicio == undefined || this.hora_fin == undefined || this.fechas.length <= 0) {
              this.mensaje('Faltan campos por llenar', 'danger', 3000);
            } else {
              if (!this.allDatesValid(this.fechas, this.fechasNoValidas)) {
                //datos para el detalle del pedido
                console.log('id_producto', this.producto.id_producto);
                console.log('cantidad', this.numEstudiantes);

                //datos para el pedido
                console.log('id_proveedor', this.producto.id_proveedor);
                console.log('id_colegio', this.id_colegio);
                console.log('fechas', this.fechas);
                console.log('hora inicio', this.hora_inicio);
                console.log('hora_fin', this.hora_fin);

                for (let i = 0; i < this.fechas.length; i++) {
                  // const element = array[i];
                  this._pedidos.createPedido({
                    id_colegio: this.id_colegio,
                    id_proveedor: this.producto.id_proveedor,
                    fecha:  this.fechas[i],
                    hora_inicio: this.hora_inicio.split('T')[1],
                    hora_fin: this.hora_fin.split('T')[1]
                  }).then((data: any) => {
                    this._pedidos.createDetallePedido({
                      id_pedido: data.id_pedido,
                      id_producto: this.producto.id_producto,
                      cantidad: this.numEstudiantes
                    }).then((resp: any) => {
                      console.log(resp.mensaje);
                    }).catch(e => {
                      console.log(e.message);
                    })
                  }).catch(e => {
                    console.log(e.message);
                  })
                }

                this.router.navigate(['/dashboard/menu']);

              } else {
                this.mensaje('existe una fecha no valida vefifique antes de hacer el pedido', 'danger', 3000);
              }
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
      this.id_proveedor = resp.id_proveedor;
      this.limite = Number(resp.limite_entregas);
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
    this.fechas = e.detail.value;
    this.nopermitido = '';
    console.log(this.fechas);
    if (this.fechas) {
      const date = this.fechas[this.fechas.length - 1];
      this._pedidos.getPedidoByProveedorAndFechaEntrega(this.id_proveedor, date)
        .then((resp: any) => {
          console.log(this.CantidadTotal(resp), 'este es la cantidad que existe ');
          console.log(this.numEstudiantes + this.CantidadTotal(resp), 'cantidad mas los estudiantes')
          if (this.numEstudiantes + this.CantidadTotal(resp) > this.limite) {
            this.nopermitido = this.fechas[this.fechas.length - 1];
            this.fechasNoValidas.push(this.fechas[this.fechas.length - 1]);
            this.mensaje(`No se aceptan mas pedidos para la fecha ${date}`, 'danger', 5000);
          } else {
            console.log('se aceptan pedidos');
          }
        }).catch((e: any) => {
          console.log(e.message);
        })
    }
   
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
        if (item.estado) {
          this.fechasBloqueadas.push(item.fecha_entrega.substr(0, 10));
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

  private getInfoColegio() {
    this._storage.getDataUser().then((resp: any) => {
      this.id_colegio = resp.id_colegio;
      this.numEstudiantes = Number(resp.estudiantes);
      this.getPedidosColegio(resp.id_colegio);
    });
  }
  //anulando los sabados y domingos
  public isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    const formattedDate = date.toISOString().slice(0, 10);
    return utcDay !== 0 && utcDay !== 6 && !this.fechasBloqueadas.includes(formattedDate);
  };
  //sumar todas las cantidades de los pedidos
  private CantidadTotal(pedidos: any[]): number {
    let totalCantidad = pedidos.reduce((sum, item) => {
      return sum + item.cantidad;
    }, 0);
    return totalCantidad;
  }
  //verificar si existe alguna fecha invalida en las fechas validas
  private allDatesValid(fechas_validas: string[], fechas_invalidas: string[]): boolean {
    return fechas_invalidas.some(invalidDate => fechas_validas.includes(invalidDate));
  }

}
