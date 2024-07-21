import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:8080/api/auth';
  constructor(private http:HttpClient) { }

  public login(usuario:string,pass:string) {
      return this.http.post(`${this.url}/login_app`,{usuario,pass}).toPromise(); 
  }
}
