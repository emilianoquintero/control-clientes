import { Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';

export const routes: Routes = [
    {path: '', component: TableroComponent}, //LocalHost
    {path: 'login', component: LoginComponent},
    {path: 'cliente/editar/:id', component: EditarClientesComponent},
    {path: '**', component: NoEncontradoComponent},
];
