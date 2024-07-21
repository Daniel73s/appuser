import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url: string = 'http://localhost:8080/api/productos';
  constructor(private http:HttpClient) { }

  //obtener todos los productos activos
  public getProductos() {
    return this.http.get(`${this.url}/activos`).toPromise();
  }

  public getOneProducto(id:string) {
    return this.http.get(`${this.url}/detalle/${id}`).toPromise();
  }
  public getProductosByCategoria(id:string) {
    return this.http.get(`${this.url}/producto_categoria/${id}`).toPromise();
  }
}
