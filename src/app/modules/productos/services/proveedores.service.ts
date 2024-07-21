import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private url:string='http://localhost:8080/api/proveedores';
  constructor(private http:HttpClient) { }

  public getProductosProveedor(id_proveedor:string){
    return this.http.get(`${this.url}/productos/allproductos/${id_proveedor}`).toPromise();
  }
}
