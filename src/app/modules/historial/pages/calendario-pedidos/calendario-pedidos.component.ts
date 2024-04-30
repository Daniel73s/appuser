import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calendario-pedidos',
  templateUrl: './calendario-pedidos.component.html',
  styleUrls: ['./calendario-pedidos.component.scss'],
})
export class CalendarioPedidosComponent implements OnInit {

  constructor(private alertCtrl: AlertController) { }
  public hoy=new Date().toLocaleDateString();
  public fecha='';
  public pedido=false;
  ngOnInit() {
    const aux=this.hoy.replace(/\//g, "-").split('-');
    this.fecha=`${aux[2]}-${aux[1]}-${aux[0]}`;
    this.highlightedDates.map((item: any) => {
      return item.backgroundColor= 'var(--ion-color-secondary)',
             item.textColor='var(--ion-color-secondary-contrast)'
    })
  }

  async filtrar() {
    const alert = await this.alertCtrl.create({
      message: 'Seleccionar mes',
      inputs: [
        {
          type: 'month',
          name: 'mes',
          label: 'Seleccione el mes que decea ver'
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
          handler: (data: any) => {
            this.fecha=data.mes;
          }
        }
      ]
    });

    await alert.present();
  }
  public verpedidos(e:any){
    console.log(e.detail.value);
    this.pedido=true;
  }
  public highlightedDates = [
    {
      date: '2023-10-05',
    },
    {
      date: '2023-10-10',
    },
    {
      date: '2023-10-20',
    },
    {
      date: '2023-10-23',
    },
  ];

}
