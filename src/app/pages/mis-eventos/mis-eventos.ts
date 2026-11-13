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
  
  // Solo necesitamos esta variable para saber qué tarjeta está deslizada
  tarjetaAbiertaId: string | null = null; 

  constructor(
    private eventoService: EventoService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error', err)
    });
  }

  crearNuevoEvento() { this.router.navigate(['/nuevo-evento']); }

  // --- LÓGICA DE CLIC PARA DESLIZAR ---
  deslizarTarjeta(id: string | null, event?: Event) {
    if (event) event.stopPropagation(); // Evita clics duplicados
    this.tarjetaAbiertaId = this.tarjetaAbiertaId === id ? null : id;
  }

  // --- BOTONES DE ACCIÓN ---
  editar(evento: any, event: Event) {
    event.stopPropagation();
    console.log('Editando:', evento);
    alert('Abriendo editor...');
  }

  eliminar(evento: any, event: Event) {
    event.stopPropagation();
    if(confirm('¿Estás seguro de eliminar este evento?')) {
      console.log('Eliminando:', evento.id);
    }
  }

  publicar(evento: any, event: Event) {
    event.stopPropagation();
    alert('Evento publicado con éxito.');
  }

  participar(evento: any, event: Event) {
    event.stopPropagation();
    alert('Redirigiendo a la vista de atleta...');
  }
}