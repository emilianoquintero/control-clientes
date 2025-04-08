import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientes: Observable<Cliente[]>;
  private clientesRef: any;

  constructor(private firestore: Firestore) {
    // Realizamos una consulta para obtener listado de clientes
    const clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, {idField: 'id'}) as Observable<Cliente[]>;

   }

   getClientes(): Observable<Cliente[]>{
    return this.clientes;
   }

}
