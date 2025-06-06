import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { StorageService } from '../../utils/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    storageService = inject(StorageService);
    router = inject(Router);

    logout() {
        this.storageService.clearToken();
        this.router.navigate(["login"]);
    }
}
