import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { StorageService } from '../../utils/storage.service';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    storageService = inject(StorageService);

    logout() {
        this.storageService.clearToken();
    }
}
