import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { CategoriasService } from './services/categorias.service';
import { ProductosService } from './services/productos.service';
import { IonSegment } from '@ionic/angular';
register();
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  public categorias: any[] = [];
  public productos: any[] = [];
  public texto: string = '';
  public preciobuscar:string='';
  @ViewChild('segment_categoria') cat_segmnet!:IonSegment;
  constructor(private router: Router,
    private _categorias: CategoriasService,
    private _productos: ProductosService) { }

  ionViewWillEnter() {
    this.getCategorias();
    this.getProductos();
    this.cat_segmnet.value='todos';    
  }


  private getCategorias() {
    this._categorias.getCategorias().then((resp: any) => {
      this.categorias = resp;
    }).catch(e => console.log)
  }


  private getProductos() {
    this._productos.getProductos().then((resp: any) => {
      this.productos = resp;
      console.log(this.productos);
      
    }).catch(e => console.log)
  }


  public showcategoria(id: string) {
    this.router.navigate(['/dashboard/menu/categoria', id]);
  }

  public detalleProducto(id_producto: string) {
    this.router.navigate(['/dashboard/menu/detalle-producto', id_producto]);
  }

  public ordenar(id: string) {
    this.router.navigate(['/dashboard/menu/ordenar-producto']);
  }

  public buscar(e: any) {
    this.texto=e.detail.value;
  }

  public segment(e: any) {
    const id_categoria = e.detail.value;
    // this.router.navigate(['/dashboard/menu/categoria', id_categoria]);
    if (id_categoria == 'todos') {
      this.getProductos();
    } else {
      this._productos.getProductosByCategoria(id_categoria).then((resp: any) => {
        this.productos = resp;
      }).catch(e => console.log)
    }
  }

  public filtrarprecio(e:any){
    this.preciobuscar=e.detail.value;
  }
}
