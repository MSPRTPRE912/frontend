import { Component, inject } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    router = inject(Router);
    authService = inject(AuthService);

    loginForm: FormGroup = new FormGroup([]);

    ngOnInit(): void{
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required]),
            'otpCode': new FormControl(null, [Validators.required])
        });
    }

    onSubmit(){
        
    }

    toRegisterPage(){
        this.router.navigate(["register"]);
    }
}
