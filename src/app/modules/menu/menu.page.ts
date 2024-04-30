import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

public categorias:any=[
  {
    titulo:'Lacteos',
    img:'https://cdn-icons-png.flaticon.com/512/6170/6170728.png',
  },
  {
    titulo:'Frutas',
    img:'https://cdn-icons-png.flaticon.com/512/2151/2151531.png',
  },
  {
    titulo:'Cereales',
    img:'https://cdn-icons-png.flaticon.com/512/1159/1159085.png',
  },
  {
    titulo:'Dulces',
    img:'https://cdn-icons-png.flaticon.com/512/3081/3081949.png',
  }
]


  public showcategoria(id:string){
    this.router.navigate(['/dashboard/menu/categoria']);
  }

  public detalle(id:string){
    this.router.navigate(['/dashboard/menu/detalle-producto']);
  }

  public ordenar(id:string){
    this.router.navigate(['/dashboard/menu/ordenar-producto']);
  }
}
