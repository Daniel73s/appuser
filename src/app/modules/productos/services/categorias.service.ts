import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private url="http://localhost:8080/api/categorias";
  constructor(private http:HttpClient) { }

 
  public getCategoriasValidas(){
    return this.http.get(`${this.url}/validas`).toPromise();
  }

}
