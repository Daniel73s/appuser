import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapaComponent } from '../../modals/mapa/mapa.component';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

 public async abrir_mapa(){
      const modal=await this.modalCtrl.create({
        component:MapaComponent
      });
      await modal.present();
  }
}
