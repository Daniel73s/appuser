import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  constructor(private alertCtrl: AlertController,private router:Router) { }

  ngOnInit() {
  }

  public pedidos: any = [
    {
      producto: 'Ensalada de frutas',
      proveedor: 'Frutas del Paraíso',
      estado: 'recibido',
      precio: '2',
      detalle: {
        fecha_entrega: '20.05.2023',
        hora_entrega: '7:00 a 9:00',
        referencia: ' Parque bolivar entre av. lapaz y belgrano'
      }
    },
    {
      producto: 'Donas',
      proveedor: 'Mundo de las masas',
      estado: 'pendiente',
      precio: '2',
      detalle: {
        fecha_entrega: '20.11.2023',
        hora_entrega: '7:00 a 9:00',
        referencia: ' Parque bolivar entre av. lapaz y belgrano'
      }
    },
    {
      producto: 'karpil',
      proveedor: 'Pil Tarija',
      estado: 'pendiente',
      precio: '1',
      detalle: {
        fecha_entrega: '20.11.2023',
        hora_entrega: '7:00 a 9:00',
        referencia: ' Parque bolivar entre av. lapaz y belgrano'
      }
    },
    {
      producto: 'cereal con yourt',
      proveedor: 'Cereales Tarija',
      estado: 'confirmado',
      precio: '2',
      detalle: {
        fecha_entrega: '23.11.2023',
        hora_entrega: '7:00 a 9:00',
        referencia: ' Parque bolivar entre av. lapaz y belgrano'
      }
    }
  ];

  async filtro() {
    const alert = await this.alertCtrl.create({
      header: 'Filtrar',
      message: 'Filtrar Pedidos por rango de fechas',
      inputs: [
        {
          type: 'date',
          name: 'fecha_inicio',
          label: 'Fecha de inicio',
          attributes: {
            max: new Date().toISOString().split('T')[0]
          }
        },
        {
          type: 'date',
          name: 'fecha_fin',
          label: 'Fecha de fin',
          attributes: {
            max: new Date().toISOString().split('T')[0]
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
            console.log('Confirm Okay', e);
          }
        }
      ],

    });

    await alert.present();
  }
  public calendario() {
    this.router.navigate(['/dashboard/historial/calendario'])
  }

  public detalle_pedido(id:string){
      this.router.navigate(['/dashboard/historial/detalle-pedido'])
  }
}
