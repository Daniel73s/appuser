import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-catalogo-proveedor',
  templateUrl: './catalogo-proveedor.component.html',
  styleUrls: ['./catalogo-proveedor.component.scss'],
})
export class CatalogoProveedorComponent implements OnInit {
  private id: string = '';
  public texto: string = '';
  public proveedor: any;
  public productos: any[] = [];
  constructor(private router: Router,
    private routerActivate: ActivatedRoute,
    private _proveedores: ProveedoresService) { }

  ngOnInit() {
    this.id = this.routerActivate.snapshot.params['id'];
    this.getProductos(this.id);
    this.getProveedor(this.id);
  }

  public detalle(id: string) {
    this.router.navigate(['/dashboard/menu/detalle-producto',id]);

  }
  public ordenar(id: string) {
    this.router.navigate(['/dashboard/menu/ordenar-producto']);
  }

  private getProductos(id: string) {
    this._proveedores.getProductosByProveedor(id).then((resp: any) => {
      this.productos = resp;
    }).catch(e => console.log)
  }

  private getProveedor(id: string) {
    this._proveedores.getProveedor(id).then(resp => {
      this.proveedor = resp;
    }).catch(e => {
      console.log(e.message);
    });
  }

  public buscar(e: any) {
    this.texto = e.detail.value;
  }
}
