import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  crearCuenta() {
    if (this.registroForm.valid) {
      console.log('Datos de registro:', this.registroForm.value);
      alert('¡Cuenta creada exitosamente!');
      this.router.navigate(['/login']);
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}