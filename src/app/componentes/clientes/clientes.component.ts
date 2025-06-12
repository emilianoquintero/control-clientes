import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from '../../servicios/client.service';
import { Client } from '../../modelo/client.model';

@Component({
  selector: 'app-clientes',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Cliente[] | null = null;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined,
  };

  clients: Client[] | null = null;
  client: Client = {
    firstName: '',
    secondName: '',
    email: '',
    phoneNumber: undefined,
    age: undefined
  }


  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(
    private ClienteServicio: ClienteService,
    private ClientService: ClientService
  ){}

  ngOnInit(){
    this.ClientService.findAll().subscribe(clients => {
      this.clients = clients;
    });
  }

  // getSaldoTotal(): string | number {
  //   let saldoTotal: number = 0;
  //   if(this.clientes){
  //     this.clientes.forEach(cliente => {
  //       if(cliente.saldo !== undefined) {
  //         saldoTotal += cliente.saldo;
  //       }
  //     });
  //   }
  //   return saldoTotal;
  // }

  // getSaldoTotal(): number {
  //   return this.clientes?.reduce((total, cliente) => total + (cliente.saldo ?? 0), 0) ?? 0;
  // }

  agregar(clienteForm: NgForm) {
    const {value, valid} = clienteForm;
    if(valid){
      // Logica para agregar cliente
      this.ClientService.createClient(value).subscribe(resp => {
        console.log('Respuesta del servidor:', resp);
            this.ClientService.findAll().subscribe(clients => {
              this.clients = clients;
            });
      });
      clienteForm.resetForm();
      this.cerrarModal();
    }
  }
  
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
