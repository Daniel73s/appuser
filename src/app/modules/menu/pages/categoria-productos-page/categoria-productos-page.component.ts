import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-categoria-productos-page',
  templateUrl: './categoria-productos-page.component.html',
  styleUrls: ['./categoria-productos-page.component.scss'],
})
export class CategoriaProductosPageComponent implements OnInit {
  private id: string = '';
  public categoria: any;
  public productos:any[]=[];
  public texto:string='';
  constructor(private router: Router,
    private ActivateRoured: ActivatedRoute,
    private _categorias: CategoriasService,
    private _productos: ProductosService) { }

  ngOnInit() {
    this.id = this.ActivateRoured.snapshot.params['id'];
    this.getCategoria(this.id);
    this.getProductos(this.id);
  }

  public detalleProducto(id_producto: string) {
    this.router.navigate(['/dashboard/menu/detalle-producto',id_producto]);
  }

  public ordenar(id: string) {
    this.router.navigate(['/dashboard/menu/ordenar-producto']);
  }

  private getCategoria(id_categoria: string) {
    this._categorias.getOneCategoria(id_categoria).then((resp: any) => {
      console.log(resp);
      this.categoria = resp;
    }).catch(e => console.log)
  }

  private getProductos(id_categoria: string) {
    this._productos.getProductosByCategoria(id_categoria).then((resp:any)=>{
      console.log(resp);
      this.productos=resp;
    }).catch(e=>console.log)
  }

  public buscar(e:any){
    this.texto=e.detail.value;
  }
}
