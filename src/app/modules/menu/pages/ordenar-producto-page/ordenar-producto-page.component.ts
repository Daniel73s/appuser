import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

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
  constructor(private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.generarHoras();
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

  async alerta() {
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
            console.log('Confirm Okay');
            this.carga();
            setTimeout(() => {
              this.loading.dismiss();
              this.mensaje('Se realizo correctamente el pedido','checkmark-outline')
              this.router.navigate(['/dashboard/menu']);
            }, 2000);
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

}
