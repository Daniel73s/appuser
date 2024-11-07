import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapboxService } from 'src/app/services/mapbox.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-mapa-proveedor',
  templateUrl: './mapa-proveedor.component.html',
  styleUrls: ['./mapa-proveedor.component.scss'],
})
export class MapaProveedorComponent implements OnInit {
private id_proveedor!:string;
  constructor(private mapbox: MapboxService,private ActivateRoute:ActivatedRoute, private reportes: ReportesService) { }

  ionViewWillEnter(){
    this.id_proveedor = this.ActivateRoute.snapshot.params['id_proveedor'];
    console.log(this.id_proveedor);
    this.getPedidos() 
    
  }
  ngOnInit() {
    this.mapbox.createMap();

  }

  private getPedidos() {
    const date=new Date().toISOString();
    this.mapbox.deleteMarkers();
      this.reportes.getPedidosProveedorByDate(this.id_proveedor,date.slice(0,10),'confirmado').then(((resp:any)=>{
        resp.forEach((item:any) => {
          this.mapbox.createPin(item);
        });
      }))
  }


}
