import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEstado'
})
export class FilterEstadoPipe implements PipeTransform {

  transform(productos: any[], estado: string): any[] {
    if (!productos || estado=='todos') {
      return productos;
    }
    return productos.filter(producto => producto.estado.toLowerCase() === estado.toLowerCase());
  }

}
