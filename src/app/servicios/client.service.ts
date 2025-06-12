import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { Client } from '../modelo/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://3.144.235.119:8080/api/users';

  constructor(
    private http: HttpClient
  ) { }

  

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl); // Petición GET
  }

  getById(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`); // Petición GET
  }

  createClient(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente); // Petición POST
  }

  updateClient(client: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, JSON.stringify(client), {headers}); // Petición PUT
  }

  deleteClient(id : any): Observable<any> {
    return this.http.delete<Client>(`${this.apiUrl}/${id}`); // Petición DELETE
  }

}
