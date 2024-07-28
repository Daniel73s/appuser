import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private url: string = 'http://localhost:8080/api/reportes';
  constructor(private http: HttpClient) { }

  //todos los pedidos de un proveedor dependiendo del mes y estado
  public getPedidosProveedorByMes(id_proveedor: string, anio: number, mes: number, estado: string) {
    return this.http.get(`${this.url}/pedidosproveedorpormes/${id_proveedor}?anio=${anio}&mes=${mes}&estado=${estado}`).toPromise();
  }

}
