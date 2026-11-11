import { Routes } from '@angular/router';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos';

export const routes: Routes = [
  { path: '', redirectTo: 'mis-eventos', pathMatch: 'full' },
  { path: 'mis-eventos', component: MisEventosComponent },
  { path: 'nuevo-evento', component: NuevoEventoComponent }
];