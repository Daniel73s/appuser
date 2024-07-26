import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url:string='http://localhost:8080/api/productos';
  constructor(private http:HttpClient) { }

  public getProductoById(id_producto:string){
    return this.http.get(`${this.url}/${id_producto}`).toPromise();
  }
  //actualizar imagen en la base de datos 
  public updateImage(id: string, url: string) {
    return this.http.patch(`${this.url}/imagen/${id}`, { url }).toPromise();
  }
  //actualizar informacion acerca del producto
  public updateProducto(id: string, producto: any) {
    return this.http.patch(`${this.url}/${id}`, producto).toPromise();
  }

   //crear nuevo producto
   public createProducto(producto: any) {
    return this.http.post(`${this.url}`, producto).toPromise();
  }

  //Asignar nuevo producto a un proveedor
  public asignarProducto(id_producto:string,id_proveedor:string) {
    return this.http.post(`${this.url}/asignar`,{id_producto,id_proveedor}).toPromise();
  }
  //actualizar el estado del producto a activo o inactivo
  async updateEstadoProducto(id: string, estado: string) {
    return this.http.patch(`${this.url}/estado/${id}`, { estado }).toPromise();
  }
}
