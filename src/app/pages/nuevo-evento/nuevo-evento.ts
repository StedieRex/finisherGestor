import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DragDropUploadComponent } from '../../components/drag-drop-upload/drag-drop-upload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropUploadComponent],
  templateUrl: './nuevo-evento.html',
  styleUrls: ['./nuevo-evento.scss']
})
export class NuevoEventoComponent implements OnInit {
  testForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      miArchivoDragAndDrop: [null]
    });

    this.testForm.valueChanges.subscribe(val => {
      console.log('El formulario cambió:', val);
    });
  }
}