import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  public detalle_producto(id:string){
        this.router.navigate(['/dashboard/menu/detalle-producto'])
  }
}
