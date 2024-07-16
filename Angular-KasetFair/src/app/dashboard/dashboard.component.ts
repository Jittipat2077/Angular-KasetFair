import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataServiceService } from '../service/data.service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  firstname: string = '';
  lastname: string = '';
  id: number = 0;
  email: string = '';
  tel: string = '';
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role !== 'admin') {
        this.router.navigate(['/index']); // Redirect to unauthorized page for non-admins
        return;
      }
      this.email = user.email;
      this.tel = user.tel;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.id = user.id;
    } else {
      this.router.navigate(['/login']); // Redirect to login page if no userData
    }
  }
}

// เฉพาะ admin เท่านั้นถึงจะเข้ามาหน้านี้ได้
// ต้องมี ข้อมูลใน localStorage เท่านั้นถึงจะมาหน้านี้ได้
