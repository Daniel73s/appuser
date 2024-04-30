import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-producto-page',
  templateUrl: './detalle-producto-page.component.html',
  styleUrls: ['./detalle-producto-page.component.scss'],
})
export class DetalleProductoPageComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  public ordenar(id:string){
    this.router.navigate(['/dashboard/menu/ordenar-producto']);
  }

}
