import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

  //METODOS 1 (estatico)
  transform(arr: any[], textoBuscarNombre: string, textoBuscarPrecio: string): any[] {
    if (!textoBuscarNombre && !textoBuscarPrecio) {
      return arr;
    }

    textoBuscarNombre = textoBuscarNombre ? textoBuscarNombre.toUpperCase() : '';
    textoBuscarPrecio = textoBuscarPrecio ? textoBuscarPrecio : '';

    return arr.filter(item => {
      const matchesNombre = textoBuscarNombre ? item['nombre'].toString().toUpperCase().includes(textoBuscarNombre) : true;
      const matchesPrecio = textoBuscarPrecio ? item['precio_unitario'].toString().includes(textoBuscarPrecio) : true;
      return matchesNombre && matchesPrecio;
    });
  }



  //METODO 2 (filtrar por varios campos)
  // transform(arr: any[], texto_buscar: string, campos: string[]): any[] {
  //   if (texto_buscar === '') {
  //     return arr;
  //   }
  //   texto_buscar = texto_buscar.toUpperCase();
  //   return arr.filter(item => {
  //     return campos.some(campo => item[campo].toString().toUpperCase().includes(texto_buscar));
  //   });
  // }

}