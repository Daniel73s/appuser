import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-detalle-producto-page',
  templateUrl: './detalle-producto-page.component.html',
  styleUrls: ['./detalle-producto-page.component.scss'],
})
export class DetalleProductoPageComponent implements OnInit {

  constructor(private router: Router,
    private RouterActivate: ActivatedRoute,
    private _Productos:ProductosService) { }
  private id_producto: string = '';
  public producto: any;
  ngOnInit() {
    this.id_producto = this.RouterActivate.snapshot.params['id'];
    this.getProducto(this.id_producto);
  }

  public ordenar(id: string) {
    this.router.navigate(['/dashboard/menu/ordenar-producto',id]);
  }

  private getProducto(id: string) {
    this._Productos.getOneProducto(id).then((resp: any) => {
      this.producto = resp;
    }).catch(e => console.log)
  }


}
