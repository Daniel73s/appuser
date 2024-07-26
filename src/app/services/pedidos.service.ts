import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private url: string = 'http://localhost:8080/api/pedidos';
  constructor(private http: HttpClient) { }
  //funcion para traer los pedidos (fechas, id_pedido) de un colegio
  public getfechasPedidos(id_colegio: string) {
    return this.http.get(`${this.url}/pedidosbycolegio/${id_colegio}`).toPromise();
  }

  //funcion para traer el pedido segun la fecha y el colegio 
  public getPedidoByColegioAndFechaEntrega(id_colegio: string, fecha_entrega: string) {
    return this.http.get(`${this.url}/pedidobycolegioandfecha?id_colegio=${id_colegio}&fecha_entrega=${fecha_entrega}`).toPromise();
  }

  //funcion para traer el pedido segun la fecha y el colegio 
  public getPedidoByProveedorAndFechaEntrega(id_proveedor: string, fecha_entrega: string) {
    return this.http.get(`${this.url}/pedidobyproveedorandfecha?id_proveedor=${id_proveedor}&fecha_entrega=${fecha_entrega}`).toPromise();
  }

  //funcion para crear un pedido
  public createPedido(pedido:any) {
    return this.http.post(`${this.url}/createpedido`,pedido).toPromise();
  }
  //funcion para crear un detalle de pedido
  public createDetallePedido(DetallePedido:any) {
    return this.http.post(`${this.url}/createdetallepedido`,DetallePedido).toPromise();
  }

  //eliminar Detalle del pedido
  public eliminarDetallePedido(id_pedido:string) {
    return this.http.delete(`${this.url}/deletedetallepedido/${id_pedido}`).toPromise();
  }

  //eliminar pedido
  public eliminarPedido(id_pedido:string) {
    return this.http.delete(`${this.url}/deletepedido/${id_pedido}`).toPromise();
  }

  //mostrar informacion acerca del pedido
  public getInformacionPedido(id_pedido:string) {
    return this.http.get(`${this.url}/informacionpedido/${id_pedido}`).toPromise();
  }

  //funcion para traer los pedidos de un proveedor
  public getPedidoByProveedor(id_proveedor: string) {
    return this.http.get(`${this.url}/allpedidosbyproveedor/${id_proveedor}`).toPromise();
  }

  //funcion para modificar el estado del pedido
  public modEstadoPedido(id_pedido: string,estado:string) {
    return this.http.put(`${this.url}/modestadopedido/${id_pedido}`,{estado}).toPromise();
  }
}
