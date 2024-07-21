import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url:string='http://localhost:8080/api/usuarios';

}
