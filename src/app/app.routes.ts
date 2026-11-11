import { Routes } from '@angular/router';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos';
import { InicioComponent } from './pages/inicio/inicio'; // <-- Importa el inicio

export const routes: Routes = [
  // Ahora la raíz redirige a 'inicio'
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
  { path: 'inicio', component: InicioComponent },
  { path: 'mis-eventos', component: MisEventosComponent },
  { path: 'nuevo-evento', component: NuevoEventoComponent }
];