import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColegiosService {
  private url: string = 'http://localhost:8080/api/colegios'
  constructor(private http: HttpClient) { }

  public getColegioById(id_colegio:string) {
    return this.http.get(`${this.url}/${id_colegio}`).toPromise();
  }
}
