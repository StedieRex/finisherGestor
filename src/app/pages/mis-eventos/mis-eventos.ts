import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private eventoService: EventoService, 
    private router: Router,
    private cdr: ChangeDetectorRef // <-- Inyéctalo aquí
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        console.log('Eventos recibidos de db.json:', this.eventos);
        
        // FUEZA A ANGULAR A DIBUJAR LA PANTALLA
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error al cargar eventos', err)
    });
  }

  crearNuevoEvento() {
    this.router.navigate(['/nuevo-evento']);
  }

  editarEvento(evento: any) {
    console.log('Editando evento:', evento);
    alert('Función de edición en construcción');
  }
}