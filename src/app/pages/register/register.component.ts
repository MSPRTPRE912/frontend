import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    showQrCodes = signal(false);
    imgQrOtp = signal("");
    imgQrPassword = signal("");
    router = inject(Router);
    authService = inject(AuthService);

    registerForm: FormGroup = new FormGroup([]);

    ngOnInit(): void{
        this.registerForm = new FormGroup({
            'email': new FormControl(null, [Validators.required]),
            'firstname': new FormControl(null, [Validators.required]),
            'lastname': new FormControl(null, [Validators.required]),
        });
    }

    onSubmit(){

    }

    toLoginPage(){
        this.router.navigate(["login"]);
    }
}
