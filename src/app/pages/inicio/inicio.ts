import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class InicioComponent {
  
  constructor(private router: Router) {}

  irAOrganizadores() {
    // Redirige al dashboard de organizadores que ya creamos
    this.router.navigate(['/mis-eventos']);
  }

  irAEventos() {
    // Aquí irá la futura vista de búsqueda para deportistas
    alert('Buscador de eventos para atletas en construcción');
  }
}