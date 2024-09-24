import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private map!: mapboxgl.Map;
  private mapbox = (mapboxgl as typeof mapboxgl);
  private markers: mapboxgl.Marker[] = [];
  constructor(private router: Router) { this.mapbox.accessToken = environment.key_mapbox; }

  public createMap() {
    this.map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 12,
      center: [-64.7344035427689, -21.534073845462892],
      pitch: 45
    });
    this.map.on('load', () => {
      this.map.resize();
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  public createPin(pedido:any) {
    const marker = new mapboxgl.Marker({ color: 'var(ion-color-secondary)' })
      .setLngLat([pedido.longitud, pedido.latitud])
      .setPopup(this.createPopup(pedido))
      .togglePopup()
      .addTo(this.map)
    this.markers.push(marker);
  }

  public createPopup(pedido: any): mapboxgl.Popup {
    const popup = new mapboxgl.Popup({ closeButton: true })
      .setHTML(`
       <div style="font-family: Arial, sans-serif; color: #333; padding: 10px;">
            <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #007BFF;">${pedido.colegio}</h3>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">
                Entrega de ${pedido.hora_inicio.slice(0, 5)} a ${pedido.hora_fin.slice(0, 5)}
            </p>
            <p style="margin: 0; font-size: 14px; color: #555;">
                Cantidad: ${pedido.cantidad} unidades
            </p>
        </div>
    `);

    popup.on('open', () => {
      const popupElement = document.querySelector('.mapboxgl-popup-content');
      if (popupElement) {
        popupElement.addEventListener('click', () => {
          this.router.navigate([`/dashboard/historial/detalle-pedido/${pedido.id_pedido}`])
        });
      }
    });
    return popup
  }

  public deleteMarkers() {
    this.markers.forEach(marker => marker.remove());
    // Limpiar el array después de eliminar los marcadores
    this.markers.length = 0;
  }
}
