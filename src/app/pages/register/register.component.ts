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
    imgQrOtp = signal("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoAQMAAAB3bUanAAAABlBMVEUAAAD///+l2Z/dAAACzklEQVR4Xu3dQWvDMAyA0eSf95c3Y7mISLMUOrYWeN8pxtDns8HVdryz7bGNncBq4+z5vdqvwHMb2z9Tp9PpdDqdTqfT6XQ6nU6n049VSc8bTelEdZdOp9PpdDqdTqc30el0Op1Op2/RYFYkc3Uj2n+j0+l0Op1Op9PpdDqdTqfT6fTalgr4L3U6nU6n0+l0Op1Op9PpdDqdHtw/6HQ6nU6n0+l0Op1Op9PpdDp91daerTFfegtMp9PpdDqdTqfT6XQ6nU6n05uGe8MkZX2InqPT6XQ6nU6n0+l0Op1Op9OPm6XDRAv9VvRLdDqdTqfT6XQ6nU6n0+l0erotXHCLZZh9dQzG2U6n0+l0Op1Op9PpY3Q6nU6n0wNpao7QDKul0+l0Op3eRKfT6XQ6nU6n0+n9oIu7cwdCH8xY0ukRnU6n0+l0Op1Op9PpdDp9njcxD6ad51nk5TX6JTqdTqfT6XQ6nU6n0+l0Or0ZZdH1Ipd2P06n0+l0Op1Op9PpdDqdTqfTH6sfLEjduDkQds/wGZ1Op9PpOTqdTqfT6XQ6nU6nr82tPdbZdFsYel3S6XQ6nU6n0+l0Op1Op9Pp9PEf5GbzPhzcKvolOp1Op9PpdDqdTqfT6XQ6PSF3H+L2DwNq9ZkuvUan0+l0Op1Op9PpdDqdTqfPzfNhn+UrCq5+0el0Op1Op9PpdDqdTqfT6fTxPWyRao1epXxlSKc30el0Op1Op9PpdDqdTqfTj1Whj28HKjLPqaXTa3Q6nU6n0+l0Op1Op9Pp9JB+QpoTJb0rXSO+ptPpdDqdTqfT6XQ6nU6n0+n0oapPx3pdp9PpdDqdTqfT6XQ6nU6n0+n166wfLzDPrt3p9IhOp9PpdHpEp9PpdDqdTqfXlnosh2kD0c23wHQ6nU6n0+l0Op1Op9PpdDq9q78j7PUwl0v6JTqdTqfT6XQ6nU6n0+l0Ov14Z19bU+3PR9EPDQAAAABJRU5ErkJggg==");
    imgQrPassword = signal("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoAQMAAAB3bUanAAAABlBMVEUAAAD///+l2Z/dAAACzklEQVR4Xu3dQWvDMAyA0eSf95c3Y7mISLMUOrYWeN8pxtDns8HVdryz7bGNncBq4+z5vdqvwHMb2z9Tp9PpdDqdTqfT6XQ6nU6n049VSc8bTelEdZdOp9PpdDqdTqc30el0Op1Op2/RYFYkc3Uj2n+j0+l0Op1Op9PpdDqdTqfT6fTalgr4L3U6nU6n0+l0Op1Op9PpdDqdHtw/6HQ6nU6n0+l0Op1Op9PpdDp91daerTFfegtMp9PpdDqdTqfT6XQ6nU6n05uGe8MkZX2InqPT6XQ6nU6n0+l0Op1Op9OPm6XDRAv9VvRLdDqdTqfT6XQ6nU6n0+l0erotXHCLZZh9dQzG2U6n0+l0Op1Op9PpY3Q6nU6n0wNpao7QDKul0+l0Op3eRKfT6XQ6nU6n0+n9oIu7cwdCH8xY0ukRnU6n0+l0Op1Op9PpdDp9njcxD6ad51nk5TX6JTqdTqfT6XQ6nU6n0+l0Or0ZZdH1Ipd2P06n0+l0Op1Op9PpdDqdTqfTH6sfLEjduDkQds/wGZ1Op9PpOTqdTqfT6XQ6nU6nr82tPdbZdFsYel3S6XQ6nU6n0+l0Op1Op9Pp9PEf5GbzPhzcKvolOp1Op9PpdDqdTqfT6XQ6PSF3H+L2DwNq9ZkuvUan0+l0Op1Op9PpdDqdTqfPzfNhn+UrCq5+0el0Op1Op9PpdDqdTqfT6fTxPWyRao1epXxlSKc30el0Op1Op9PpdDqdTqfTj1Whj28HKjLPqaXTa3Q6nU6n0+l0Op1Op9Pp9JB+QpoTJb0rXSO+ptPpdDqdTqfT6XQ6nU6n0+n0oapPx3pdp9PpdDqdTqfT6XQ6nU6n0+n166wfLzDPrt3p9IhOp9PpdHpEp9PpdDqdTqfXlnosh2kD0c23wHQ6nU6n0+l0Op1Op9PpdDq9q78j7PUwl0v6JTqdTqfT6XQ6nU6n0+l0Ov14Z19bU+3PR9EPDQAAAABJRU5ErkJggg==");
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
            user_id: this.registerForm.controls["email"].value
        };
        let passwordObservable = this.authService.generatePassword(passwordRequest);

        let otpRequest: GenerateOTPRequestModel = {
            user_id: this.registerForm.controls["email"].value
        };
        let otpObservable = this.authService.generateOTP(otpRequest);

        forkJoin([passwordObservable, otpObservable]).subscribe({
            next: ([passwordResponse, otpResponse]) => {
                this.imgQrPassword.set(passwordResponse.password_qrcode);
                this.imgQrOtp.set(otpResponse['2fa_qrcode']);
                
                this.showQrCodes.set(true);
            }
        })

    }

    toLoginPage(){
        this.router.navigate(["login"]);
    }
}
