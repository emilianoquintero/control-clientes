import { Component } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../../modelo/cliente.modelo';
import { FormsModule, NgForm } from '@angular/forms';
import { Client } from '../../modelo/client.model';
import { ClientService } from '../../servicios/client.service';

@Component({
  selector: 'app-editar-clientes',
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css'
})
export class EditarClientesComponent {
 cliente: Cliente = {
  nombre: '',
  apellido: '',
  email: '',
  saldo: undefined,
 }

  client: Client = {
    firstName: '',
    secondName: '',
    email: '',
    phoneNumber: undefined,
    age: undefined
  }

  clients: Client[] | null = null;
  id: string | null = null;

 constructor(
  private clienteServicio : ClienteService,
  private clientService : ClientService,
  private router: Router,
  private route: ActivatedRoute
 ){}

 ngOnInit(){
  this.id = this.route.snapshot.paramMap.get('id');
  if(this.id){
    this.clientService.getById(this.id).subscribe((client: Client | null) => {
      if(client){
        this.client = client;
      }
      else{
        console.log('Cliente no encontrado: '+ this.id);
        this.router.navigate(['/']);
      }
    });
  }
  else{
    console.log('ID no proporcionado');
    this.router.navigate(['/']);
    
  }
 }

 loadClients() {
  this.clientService.findAll().subscribe(clients => {
    this.clients = clients; // Actualiza la lista en la vista
  });
}


 guardar(clienteForm: NgForm){
  const {value, valid} = clienteForm;
  if(valid){
    value.id = this.id;
    this.clientService.updateClient(value).subscribe(response => {
      console.log('Respuesta del servidor:', response);
    });
    this.loadClients();
    this.router.navigate(['/']);
  }
 }

 eliminar() {
  if(confirm('Eliminaras el cliente')){
    this.clientService.deleteClient(this.id).subscribe(resp => {
      console.log('Respuesta del servidor:', resp);
        this.clientService.findAll().subscribe(clients => {
          this.clients = clients; // Actualiza la lista en la vista
        });
    });
    this.router.navigate(['/']);
  }
 }

}
