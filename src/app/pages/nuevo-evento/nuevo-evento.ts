import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { DragDropUploadComponent } from '../../components/drag-drop-upload/drag-drop-upload';
import { EventoService } from '../../services/evento.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, DragDropUploadComponent],
  templateUrl: './nuevo-evento.html',
  styleUrls: ['./nuevo-evento.scss']
})
export class NuevoEventoComponent implements OnInit {
  eventoForm!: FormGroup;
  seccionActiva: string = 'datosGenerales';
  catalogos: any = { tiposEvento: [], modalidades: [] };

  secciones = [
    { id: 'datosGenerales', titulo: 'Datos Generales', subtitulo: 'Información principal del evento', icono: 'fas fa-clipboard-list' },
    { id: 'informacionAtletas', titulo: 'Información Atletas', subtitulo: 'Información relevante para los atletas', icono: 'fas fa-running' },
    { id: 'inscripciones', titulo: 'Inscripciones', subtitulo: 'Fechas, costos, afiliaciones y métodos de pago', icono: 'fas fa-ticket-alt' },
    { id: 'paquetes', titulo: 'Paquetes', subtitulo: 'Información sobre la entrega de Kits', icono: 'fas fa-box' },
    { id: 'reglasNormas', titulo: 'Reglas y Normas', subtitulo: 'Reglamento oficial y términos de participación', icono: 'fas fa-book' },
    { id: 'informacionAdicional', titulo: 'Información Adicional', subtitulo: 'Hospedaje u otra información relevante', icono: 'fas fa-info-circle' }
  ];

  constructor(private fb: FormBuilder, private eventoService: EventoService) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    this.eventoService.getCatalogos().subscribe({
      next: (data) => {
        this.catalogos = data;
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  inicializarFormulario() {
    this.eventoForm = this.fb.group({
      datosGenerales: this.fb.group({
        banner: [null, Validators.required],
        thumbnail: [null, Validators.required],
        nombreEvento: ['', Validators.required],
        grupoOrganizador: ['', Validators.required],
        tipoEvento: ['', Validators.required],
        cupo: [''],
        fecha: ['', Validators.required],
        horaArranque: ['', Validators.required],
        lugar: ['', Validators.required],
        ubicacionZt: [''],
        modalidades: [''],
        distanciasFile: [null],
        rutasFile: [null],
        premiacion: [''],
        premiacionFile: [null],
        notasImportantes: ['']
      }),
      // Más adelante llenaremos los controles de las otras secciones
      informacionAtletas: this.fb.group({}),
      inscripciones: this.fb.group({}),
      paquetes: this.fb.group({}),
      reglasNormas: this.fb.group({}),
      informacionAdicional: this.fb.group({})
    });
  }

  cambiarSeccion(id: string) {
    this.seccionActiva = id;
  }

  guardarEvento() {
    if (this.eventoForm.valid) {
      console.log('Enviando payload:', this.eventoForm.value);
      this.eventoService.crearEvento(this.eventoForm.value).subscribe({
        next: (res) => alert('Evento creado exitosamente!'),
        error: (err) => alert('Error al crear el evento')
      });
    } else {
      alert('Por favor completa todos los campos obligatorios');
      this.eventoForm.markAllAsTouched(); // Marca los campos en rojo
    }
  }
}