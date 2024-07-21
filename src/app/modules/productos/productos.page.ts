import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from './services/proveedores.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage{

  private id: string = '';
  public productos: any[] = [];
  public estado:string='todos';
  constructor(private router: Router,
    private RouteActivated: ActivatedRoute,
    private _proveedor: ProveedoresService) { }

  ionViewWillEnter() {
    this.id = this.RouteActivated.snapshot.params['id'];
    console.log(this.id);
    this.getProductos(this.id);
  }

  public detalle_producto(id: string) {
    this.router.navigate(['/dashboard/productos/detalle',id])
  }
  private getProductos(id:string) {
    this._proveedor.getProductosProveedor(id).then((resp:any)=>{
        console.log(resp);
        this.productos=resp;
    }).catch((e:any)=>{console.log(e)})
  }

  public filtrarProducto(e:any){
      this.estado=e.detail.value;

  }
}
