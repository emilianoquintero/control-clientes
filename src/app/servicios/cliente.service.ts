import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { addDoc, collection, collectionData, docData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { CollectionReference, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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

   getCliente(id: string): Observable<Cliente | null>{
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteDocRef, {idField: 'id'}) as Observable<Cliente>;
   }

   modificarCliente(cliente : Cliente){
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return updateDoc(clienteDoc, {...cliente});
   }

   eliminarCliente(cliente:Cliente) {
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return deleteDoc(clienteDoc);
   }

   
}
