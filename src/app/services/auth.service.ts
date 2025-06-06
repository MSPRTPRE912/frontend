import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneratePasswordRequestModel } from '../models/generate-password-request.model';
import { AuthenticateRequestModel } from '../models/authenticate-request.model';
import { environment } from '../../environments/environment';
import { GenerateOTPRequestModel } from '../models/generate-otp-request.model';
import { AuthenticatResponseModel } from '../models/authenticate-response.model';
import { GeneratePasswordResponseModel } from '../models/generate-password-response.model';
import { GenerateOTPResponseModel } from '../models/generate-otp-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiUrl = environment.apiUrl;

    http = inject(HttpClient);

    authenticate(data: AuthenticateRequestModel): Observable<AuthenticatResponseModel>{
        return this.http.post<AuthenticatResponseModel>(this.apiUrl + "function/authenticate", data);
    }

    generatePassword(data: GeneratePasswordRequestModel): Observable<GeneratePasswordResponseModel>{
        return this.http.post<GeneratePasswordResponseModel>(this.apiUrl + "function/generate-password", data);
    }

    generateOTP(data: GenerateOTPRequestModel): Observable<GenerateOTPResponseModel>{
        return this.http.post<GenerateOTPResponseModel>(this.apiUrl + "function/generate-2fa", data);
    }
}
