import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {
  private map!: mapboxgl.Map;
  private mapbox = (mapboxgl as typeof mapboxgl);
  constructor(private modalCtrl:ModalController) { 
    this.mapbox.accessToken = environment.key_mapbox;
  }

  ngOnInit() {
    this.buidMap();
  }
 public close(){
    this.modalCtrl.dismiss();
 }

  private buidMap(){
    this.map = new mapboxgl.Map({
      container:'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 13,
      center: [-64.73349858433076, -21.53250712718626],
      pitch:45
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    new mapboxgl.Marker({color:'var(ion-color-secondary)'})
                .setLngLat([-64.73349858433076, -21.53250712718626])
                .addTo(this.map)
    this.map.on('load', () => {
      this.map.resize();
    });
  }
}
