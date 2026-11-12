import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-password.html',
  styleUrls: ['./recuperar-password.scss']
})
export class RecuperarPasswordComponent {
  pasoActual: number = 1; // 1: Correo, 2: Código, 3: Aviso Reenviar, 4: Nueva Contraseña
  
  correoForm: FormGroup;
  codigoForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Paso 1 (Inventado): Solicitar correo
    this.correoForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    // Paso 2: Código de 6 dígitos
    this.codigoForm = this.fb.group({
      digitos: this.fb.array([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required)
      ])
    });

    // Paso 4: Nuevas contraseñas
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  get digitosArray() {
    return this.codigoForm.get('digitos') as FormArray;
  }

  // Avanzar Paso 1 a Paso 2
  enviarCodigo() {
    if (this.correoForm.valid) {
      console.log('Enviando código a:', this.correoForm.value.correo);
      this.pasoActual = 2;
    } else {
      this.correoForm.markAllAsTouched();
    }
  }

  // Lógica para que al escribir un número salte al siguiente cuadro[cite: 19]
  moverFoco(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`digito-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }

  // Avanzar Paso 2 a Paso 3
  verificarCodigo() {
    if (this.codigoForm.valid) {
      const codigoStr = this.codigoForm.value.digitos.join('');
      console.log('Verificando código:', codigoStr);
      this.pasoActual = 3;
    }
  }

  // Avanzar Paso 3 a Paso 4[cite: 19]
  reenviarCorreoOContinuar() {
    // Aquí podrías tener lógica dual, pero según el flujo simulamos avanzar al reset[cite: 19]
    this.pasoActual = 4;
  }

  // Paso 4 Final: Reset[cite: 19]
  confirmarNuevaPassword() {
    if (this.passwordForm.valid) {
      const val = this.passwordForm.value;
      if (val.password === val.confirmPassword) {
        alert('Contraseña actualizada exitosamente');
        this.router.navigate(['/login']);
      } else {
        alert('Las contraseñas no coinciden');
      }
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}