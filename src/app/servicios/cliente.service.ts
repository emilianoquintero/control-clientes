import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { addDoc, collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { CollectionReference } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientes: Observable<Cliente[]>;
  private clientesRef: CollectionReference;

  constructor(private firestore: Firestore) {
    // Realizamos una consulta para obtener listado de clientes
    this.clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(this.clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, {idField: 'id'}) as Observable<Cliente[]>;

   }

   getClientes(): Observable<Cliente[]>{
    return this.clientes;
   }

   agregarCliente(cliente: Cliente) {
    return addDoc(this.clientesRef, cliente);
   }

}
