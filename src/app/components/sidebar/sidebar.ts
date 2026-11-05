import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  @Input() secciones: any[] = [];
  @Input() seccionActiva: string = '';
  @Output() seccionCambiada = new EventEmitter<string>();

  seleccionar(id: string) {
    this.seccionCambiada.emit(id);
  }
}