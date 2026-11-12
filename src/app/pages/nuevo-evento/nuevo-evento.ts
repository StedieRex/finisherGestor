import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
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

  // --- GETTERS PARA LOS FORMARRAYS ---
  get splits(): FormArray {
    return this.eventoForm.get('datosGenerales.categoriasDistancias') as FormArray;
  }

  getRamas(splitIndex: number): FormArray {
    return this.splits.at(splitIndex).get('ramas') as FormArray;
  }

  getCategorias(splitIndex: number, ramaIndex: number): FormArray {
    return this.getRamas(splitIndex).at(ramaIndex).get('categorias') as FormArray;
  }

  // --- MÉTODOS PARA AGREGAR/ELIMINAR SPLITS ---
  nuevoSplit(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      ramas: this.fb.array([]),
      // NUEVO: Cada split nace con al menos una fila de costos
      fechasCostos: this.fb.array([ this.nuevaFechaCosto() ]) 
    });
  }

  // --- MÉTODOS PARA FECHAS Y COSTOS DE INSCRIPCIÓN ---
  nuevaFechaCosto(): FormGroup {
    return this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      costo: ['', Validators.required]
    });
  }

  getFechasCostos(splitIndex: number): FormArray {
    return this.splits.at(splitIndex).get('fechasCostos') as FormArray;
  }

  addFechaCosto(splitIndex: number) {
    this.getFechasCostos(splitIndex).push(this.nuevaFechaCosto());
  }

  removeFechaCosto(splitIndex: number, costoIndex: number) {
    this.getFechasCostos(splitIndex).removeAt(costoIndex);
  }

  addSplit() {
    this.splits.push(this.nuevoSplit());
  }

  removeSplit(index: number) {
    this.splits.removeAt(index);
  }

  // --- MÉTODOS PARA AGREGAR/ELIMINAR RAMAS ---
  nuevaRama(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      categorias: this.fb.array([])
    });
  }

  addRama(splitIndex: number) {
    this.getRamas(splitIndex).push(this.nuevaRama());
  }

  removeRama(splitIndex: number, ramaIndex: number) {
    this.getRamas(splitIndex).removeAt(ramaIndex);
  }

  // --- MÉTODOS PARA AGREGAR/ELIMINAR CATEGORÍAS ---
  nuevaCategoria(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  addCategoria(splitIndex: number, ramaIndex: number) {
    this.getCategorias(splitIndex, ramaIndex).push(this.nuevaCategoria());
  }

  removeCategoria(splitIndex: number, ramaIndex: number, categoriaIndex: number) {
    this.getCategorias(splitIndex, ramaIndex).removeAt(categoriaIndex);
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
        categoriasDistancias: this.fb.array([]),
        distanciasFile: [null],
        rutasFile: [null],
        premiacion: [''],
        premiacionFile: [null],
        notasImportantes: ['']
      }),
      // Más adelante llenaremos los controles de las otras secciones
      informacionAtletas: this.fb.group({
        // Ingreso de Bicicletas
        ingresoBicicletasNoAplica: [false],
        ingresoFecha: [''],
        ingresoLugar: [''],
        ingresoHoraInicial: [''],
        ingresoHoraLimite: [''],
        
        // Guardaropa y Junta Previa
        guardaropa: ['', Validators.required],
        juntaPreviaNoAplica: [false],
        juntaPrevia: [''],
        
        // Drafting
        draftingNoAplica: [false],
        drafting: [''],
        
        // Textos largos
        abastecimientos: ['', Validators.required],
        metaRecuperacion: ['', Validators.required],
        jueces: ['', Validators.required],
        
        // Reglamento
        reglamentoFile: [null],
        reglamentoTexto: [''],
        
        // Tiempos Máximos
        tiemposMaximosNoAplica: [false],
        tiemposMaximosTexto: [''],
        tiemposMaximosFile: [null],
        
        // Guía y Carta
        guiaAtletaFile: [null],
        cartaResponsivaFile: [null]
      }),
      inscripciones: this.fb.group({
        afiliacion: ['', Validators.required],
        lugares: ['', Validators.required],
        formasPago: ['', Validators.required],
        notasImportantes: [''] // Es independiente de las notas generales
      }),
      paquetes: this.fb.group({
        entregaKits: this.fb.group({
          fecha: ['', Validators.required],
          lugar: ['', Validators.required],
          horaInicial: ['', Validators.required],
          horaLimite: ['', Validators.required],
          notasImportantes: ['']
        })
      }),
      reglasNormas: this.fb.group({
        reglas: ['', Validators.required] // Basado en el asterisco de tu diseño
      }),
      informacionAdicional: this.fb.group({
        hospedaje: ['', Validators.required],
        otros: ['']
      })
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

  llenarDatosPrueba() {
    // 1. Recrear el FormArray dinámico (Splits, Ramas y Costos) antes del patchValue
    this.splits.clear();

    // -- Crear Split de 15KM --
    const split15 = this.nuevoSplit();
    const ramas15 = split15.get('ramas') as FormArray;
    ramas15.clear(); // Limpiamos la rama vacía por defecto
    
    // Rama Varonil (15KM)
    const ramaVaronil = this.nuevaRama();
    const catsVaronil = ramaVaronil.get('categorias') as FormArray;
    catsVaronil.clear();
    catsVaronil.push(this.fb.group({ nombre: 'Libre (18-39 años)' }));
    catsVaronil.push(this.fb.group({ nombre: 'Master (40-49 años)' }));
    ramas15.push(ramaVaronil);

    // Costos para 15KM
    const costos15 = split15.get('fechasCostos') as FormArray;
    costos15.clear();
    const costo1_15 = this.nuevaFechaCosto();
    costo1_15.patchValue({ fechaInicio: '2026-05-01', fechaFin: '2026-06-30', costo: 450 });
    const costo2_15 = this.nuevaFechaCosto();
    costo2_15.patchValue({ fechaInicio: '2026-07-01', fechaFin: '2026-08-31', costo: 600 });
    costos15.push(costo1_15);
    costos15.push(costo2_15);

    this.splits.push(split15);

    // -- Crear Split de 30KM --
    const split30 = this.nuevoSplit();
    const costos30 = split30.get('fechasCostos') as FormArray;
    costos30.clear();
    const costo1_30 = this.nuevaFechaCosto();
    costo1_30.patchValue({ fechaInicio: '2026-05-01', fechaFin: '2026-08-31', costo: 850 });
    costos30.push(costo1_30);
    
    this.splits.push(split30);


    // 2. Inyectar todos los valores al formulario principal mediante patchValue
    this.eventoForm.patchValue({
      datosGenerales: {
        banner: 'C:\\Users\\luisb\\Desktop\\imagenes y documentos\\Banner.png',
        thumbnail: 'C:\\temp\\eventos-pruebas\\thumbnail.jpg',
        nombreEvento: 'CARRERA DE LOS DE CUERNAVACA 2026',
        grupoOrganizador: 'Frente Atlético Cuernavaca',
        tipoEvento: 'Carrera',
        cupo: 1500,
        fecha: '2026-09-15',
        horaArranque: '07:00',
        lugar: 'Plaza de Armas, Cuernavaca, Morelos',
        ubicacion2T: 'No aplica',
        modalidades: 'Asfalto urbano y subidas',
        categoriasDistancias: [
          { nombre: '15KM' }, // Valores que empatan con los splits creados arriba
          { nombre: '30KM' }
        ],
        rutasFile: 'C:\\temp\\eventos-pruebas\\mapa_rutas.pdf',
        premiosFile: 'C:\\temp\\eventos-pruebas\\tabla_premios.pdf',
        premiacion: 'Bolsa garantizada de $50,000 MXN a repartir en las categorías libres.'
      },
      informacionAtletas: {
        ingresoBicicletasNoAplica: true, // Esto activará el estilo visual deshabilitado
        ingresoFecha: '',
        ingresoLugar: '',
        ingresoHoraInicial: '',
        ingresoHoraLimite: '',
        guardaropa: 'Carpa ubicada en zona norte, de 06:00 a 12:00 hrs.',
        juntaPreviaNoAplica: false,
        juntaPrevia: 'Viernes previo al evento a las 18:00 hrs por Facebook Live.',
        draftingNoAplica: true,
        drafting: '',
        abastecimientos: 'Km 3, Km 7, Km 12 y Meta. Bebida isotónica y agua.',
        metaRecuperacion: 'Carpas médicas, fisioterapia básica y kit de recuperación al cruzar el arco.',
        jueces: 'Designados por el comité organizador local.',
        reglamentoFile: 'C:\\temp\\eventos-pruebas\\reglamento_oficial.docx',
        reglamentoTexto: 'En caso de lluvia severa, el evento se retrasará 1 hora.',
        tiemposMaximosNoAplica: false,
        tiemposMaximosTexto: 'Se cerrará la meta después de 3 horas del disparo de salida.',
        tiemposMaximosFile: 'C:\\temp\\eventos-pruebas\\tiempos_corte.pdf',
        guiaAtletaFile: 'C:\\temp\\eventos-pruebas\\guia_corredor_2026.pdf',
        cartaResponsivaFile: 'C:\\temp\\eventos-pruebas\\carta_responsiva_editable.pdf'
      },
      inscripciones: {
        afiliacion: 'No se requiere afiliación a ninguna federación.',
        lugares: 'Portal en línea y tiendas deportivas afiliadas en el centro.',
        formasPago: 'Tarjeta de Crédito, Débito y transferencia bancaria directa (SPEI).',
        notasImportantes: 'No hay reembolsos ni transferencias de número por ningún motivo.'
      },
      paquetes: {
        entregaKits: {
          fecha: '2026-09-14',
          lugar: 'Centro de Convenciones Cuernavaca, Salón A.',
          horaInicial: '10:00',
          horaLimite: '18:00',
          notasImportantes: 'Es obligatorio llevar la carta responsiva firmada y copia de INE.'
        }
      },
      reglasNormas: {
        reglas: '1. Portar el número oficial siempre al frente.\n2. Seguir las instrucciones del staff.\n3. Prohibido recortar la ruta (habrá tapetes de cronometraje).'
      },
      informacionAdicional: {
        hospedaje: 'Hotel Sede Cuernavaca Inn. Tarifas especiales usando el código: RUNCUERNA26',
        otros: 'Contaremos con estacionamiento público a 2 cuadras del evento (tarifa preferencial de $50 pesos).'
      }
    });

    console.log('Formulario autocompletado:', this.eventoForm.value);
  }

}