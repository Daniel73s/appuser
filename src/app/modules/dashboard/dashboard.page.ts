import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public appPages = [
    { title: 'Productos', url: '/dashboard/productos', icon: 'list' },
    { title: 'Catalogo de productos', url: '/dashboard/menu', icon: 'fast-food' },
    { title: 'Proveedores', url: '/dashboard/proveedores', icon: 'people' },
    { title: 'Historial', url: '/dashboard/historial', icon: 'cart' }
  ];
  constructor(private router:Router) { }

  ngOnInit() {
  }

  public salir() {
    this.router.navigate(['/auth'])
  }

}
