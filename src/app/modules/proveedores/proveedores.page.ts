import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public opencatalogo(idProveedor: string) {
    this.router.navigate(['/dashboard/proveedores/catalogo']);
  }
}
