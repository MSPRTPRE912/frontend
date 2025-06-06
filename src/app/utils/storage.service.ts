import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StorageService{
    getToken(){
        return localStorage.getItem('token')!;
    }

    setToken(token: string){
        localStorage.setItem('token', token);
    }

    clearToken(){
        localStorage.removeItem('token');
    }
}