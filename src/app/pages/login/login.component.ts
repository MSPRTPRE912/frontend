import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthenticateRequestModel } from '../../models/authenticate-request.model';
import { StorageService } from '../../utils/storage.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    router = inject(Router);
    authService = inject(AuthService);
    storateService = inject(StorageService);
    showQrCodes = signal(false);
    imgQrOtp = signal("");
    imgQrPassword = signal("");
    errorMessage = signal("");

    loginForm: FormGroup = new FormGroup([]);

    ngOnInit(): void{
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required]),
            'otpCode': new FormControl(null, [Validators.required])
        });
    }

    onSubmit(){
        let authenticateRequest: AuthenticateRequestModel = {
            email: this.loginForm.controls["email"].value,
            password: this.loginForm.controls["password"].value,
            code_2fa: this.loginForm.controls["otpCode"].value
        };
        this.authService.authenticate(authenticateRequest).subscribe({
            next: (response) => {
                if(response.status && response.status == "ok") {
                    this.storateService.setToken(response.email!);
                    this.router.navigate(["dashboard"]);
                }
                else if(response.status && response.status == "expired") {
                    this.imgQrPassword.set("data:image/png;base64,"+response.password_qrcode!);
                    this.imgQrOtp.set("data:image/png;base64,"+response['2fa_qrcode']!);
                    
                    this.showQrCodes.set(true);
                }
            },
            error: (response) => {
                if(response.error) {
                    this.errorMessage.set(response.error.error!);
                }
            }
        })
    }

    toRegisterPage(){
        this.router.navigate(["register"]);
    }

    toLoginPage(){
        this.router.navigate(["login"]);
    }
}
