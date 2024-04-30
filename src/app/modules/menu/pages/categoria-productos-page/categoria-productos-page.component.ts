import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-productos-page',
  templateUrl: './categoria-productos-page.component.html',
  styleUrls: ['./categoria-productos-page.component.scss'],
})
export class CategoriaProductosPageComponent  implements OnInit {
  
  constructor(private router:Router) { }

  ngOnInit() {}
  public detalle(id:string){
    this.router.navigate(['/dashboard/menu/detalle-producto']);
  }

  public ordenar(id:string){
    this.router.navigate(['/dashboard/menu/ordenar-producto']);
  }
}
