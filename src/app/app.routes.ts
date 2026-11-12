import { Routes } from '@angular/router';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos';
import { InicioComponent } from './pages/inicio/inicio';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro'; // <-- Importa el Registro

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, // <-- Agrega la ruta
  { path: 'mis-eventos', component: MisEventosComponent },
  { path: 'nuevo-evento', component: NuevoEventoComponent }
];