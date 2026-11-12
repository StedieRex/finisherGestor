import { Routes } from '@angular/router';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos';
import { InicioComponent } from './pages/inicio/inicio';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password'

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'mis-eventos', component: MisEventosComponent },
  { path: 'nuevo-evento', component: NuevoEventoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent }
];