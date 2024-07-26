import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPedido'
})
export class FilterPedidoPipe implements PipeTransform {

  transform(pedidos: any[], estado: string, fecha_entrega: string): any[] {
    if (!pedidos) {
      return pedidos;
    }
    
    if (estado && estado !== 'todos') {
      pedidos = pedidos.filter(pedido => pedido.estado.toLowerCase() === estado.toLowerCase());
    }
    
    if (fecha_entrega) {
      pedidos = pedidos.filter(pedido => this.isSameDate(pedido.fecha_entrega, fecha_entrega));
    }
    
    return pedidos;
  }

  private isSameDate(date1: string, date2: string): boolean {
    const d1 = new Date(date1).toISOString().split('T')[0];
    const d2 = new Date(date2).toISOString().split('T')[0];
    return d1 === d2;
  }


  // transform(pedidos: any[], estado: string): any[] {
  //   if (!pedidos || estado=='todos') {
  //     return pedidos;
  //   }
  //   return pedidos.filter(pedido => pedido.estado.toLowerCase() === estado.toLowerCase());
  // }

}
