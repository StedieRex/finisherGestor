import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      console.log('Datos de login:', this.loginForm.value);
      // Aquí iría tu lógica de autenticación (ej. authService.login(...))
      // Por ahora, simulamos un login exitoso llevándote a 'mis-eventos'
      this.router.navigate(['/mis-eventos']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}