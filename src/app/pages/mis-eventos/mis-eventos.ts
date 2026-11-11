import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-eventos.html',
  styleUrls: ['./mis-eventos.scss']
})
export class MisEventosComponent implements OnInit {
  eventos: any[] = [];

  constructor(private eventoService: EventoService, private router: Router) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe({
      next: (data) => this.eventos = data,
      error: (err) => console.error('Error al cargar eventos', err)
    });
  }

  crearNuevoEvento() {
    this.router.navigate(['/nuevo-evento']);
  }

  editarEvento(evento: any) {
    // Más adelante aquí puedes pasar el ID del evento en la URL, ej: ['/editar-evento', evento.id]
    console.log('Editando evento:', evento);
    alert('Función de edición en construcción para: ' + evento.datosGenerales?.nombreEvento);
  }
}