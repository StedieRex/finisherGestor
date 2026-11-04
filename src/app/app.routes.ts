import { Routes } from '@angular/router';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento';

export const routes: Routes = [
  { path: '', redirectTo: 'nuevo-evento', pathMatch: 'full' },
  { path: 'nuevo-evento', component: NuevoEventoComponent }
];