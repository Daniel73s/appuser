import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private url: string = 'https://server-ogdr.onrender.com/api/proveedores';
  constructor(private http:HttpClient) { }

  public getProveedores() {
    return this.http.get(`${this.url}/activos`).toPromise();
  }

  public getProveedor(id:string){
    return this.http.get(`${this.url}/one/${id}`).toPromise();
  }

  public getProductosByProveedor(id:string){
    return this.http.get(`${this.url}/productos/proveedor/${id}`).toPromise();
  }


  //prueba
  public getProveedorprueba(id:string){
    this.http.get(`${this.url}/one/${id}`).subscribe(resp=>{
    })
  }

}
