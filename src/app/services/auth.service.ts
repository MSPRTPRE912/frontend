import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequestModel } from '../models/register-request.model';
import { LoginRequestModel } from '../models/login-request.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    rootUrl = environment.rootApiUrl;
    elementUrl = "auth";

    http = inject(HttpClient);
}
