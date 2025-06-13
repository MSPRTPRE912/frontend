import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { GeneratePasswordRequestModel } from '../../models/generate-password-request.model';
import { GenerateOTPRequestModel } from '../../models/generate-otp-request.model';
import { forkJoin } from 'rxjs';
import { GeneratePasswordResponseModel } from '../../models/generate-password-response.model';
import { GenerateOTPResponseModel } from '../../models/generate-otp-response.model';

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
        let passwordRequest: GeneratePasswordRequestModel = {
            email: this.registerForm.controls["email"].value,
            first_name: this.registerForm.controls["firstname"].value,
            last_name: this.registerForm.controls["lastname"].value,
        };
        let passwordObservable = this.authService.generatePassword(passwordRequest);

        let otpRequest: GenerateOTPRequestModel = {
            email: this.registerForm.controls["email"].value
        };
        let otpObservable = this.authService.generateOTP(otpRequest);

        forkJoin([passwordObservable, otpObservable]).subscribe({
            next: ([passwordResponse, otpResponse]) => {
                this.imgQrPassword.set("data:image/png;base64,"+passwordResponse.password_qrcode);
                this.imgQrOtp.set("data:image/png;base64,"+otpResponse['2fa_qrcode']);
                
                this.showQrCodes.set(true);
            }
        })

    }

    toLoginPage(){
        this.router.navigate(["login"]);
    }
}
