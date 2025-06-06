import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { StorageService } from "./storage.service";

export function authenticationGuard(): CanActivateFn {
    return () => {
        let storageService = inject(StorageService);
        let router = inject(Router);
        if(storageService.getToken() == null){
            router.navigate(['login']);
            return false;
        }
        else{
            return true;
        }
    }
}