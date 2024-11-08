import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private url: string = 'https://server-ogdr.onrender.com/api/categorias';
  constructor(private http:HttpClient) { }

  public getCategorias() {
    return this.http.get(`${this.url}/validas`).toPromise();
  }
  
  public getOneCategoria(id:string){
    return this.http.get(`${this.url}/${id}`).toPromise();
  }
}
