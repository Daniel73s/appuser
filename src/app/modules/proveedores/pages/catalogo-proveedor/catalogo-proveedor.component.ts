import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo-proveedor',
  templateUrl: './catalogo-proveedor.component.html',
  styleUrls: ['./catalogo-proveedor.component.scss'],
})
export class CatalogoProveedorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() { }

  public detalle(id:string) {
    console.log('detalle');
    this.router.navigate(['/dashboard/menu/detalle-producto']);
    
  }
  public ordenar(id:string) {
    console.log('ordenar');
    this.router.navigate(['/dashboard/menu/ordenar-producto']);
  }
}
