import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { StorageService } from '../../utils/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    storageService = inject(StorageService);
    router = inject(Router);
    email = signal("");

    ngOnInit(): void {
        this.email.set(this.storageService.getToken());
    }

    logout() {
        this.storageService.clearToken();
        this.router.navigate(["login"]);
    }
}
