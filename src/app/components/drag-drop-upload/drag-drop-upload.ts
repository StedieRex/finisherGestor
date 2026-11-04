import { Component, Input, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-drop-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drag-drop-upload.html',
  styleUrls: ['./drag-drop-upload.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DragDropUploadComponent),
      multi: true
    }
  ]
})

export class DragDropUploadComponent implements ControlValueAccessor {
  @Input() label: string = 'Arrastra tu archivo aquí';
  @Input() hint: string = 'PNG, JPG, JPEG, DOC, DOCX, PDF hasta 5MB';
  
  isDragging = false;
  file: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isDisabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    if (this.isDisabled) return;
    
    this.file = file;
    this.onChange(this.file);
    this.onTouched();

    // Generar vista previa si es imagen
    if (file.type.match(/image\/*/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null; // No hay vista previa para documentos
    }
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.file = null;
    this.previewUrl = null;
    this.onChange(null);
  }

  // --- Métodos de ControlValueAccessor ---
  writeValue(value: any): void {
    if (value === null) {
      this.file = null;
      this.previewUrl = null;
    }
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void { this.isDisabled = isDisabled; }
}