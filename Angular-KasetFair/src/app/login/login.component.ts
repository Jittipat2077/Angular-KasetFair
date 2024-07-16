import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../service/data.service.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [HttpClientModule, FormsModule,RouterLink], // โมดูลที่จำเป็น
  providers: [DataServiceService], // ตรวจสอบบริการ
})
export class LoginComponent {
  username: string = '';
  constructor(
    private dataService: DataServiceService,
    private httpClient: HttpClient,
    private router: Router
  ) { }
  login(email: string, password: string) {
    const loginData = { email: email, password: password };
  
    this.httpClient.post(this.dataService.apiEndpoint + '/login', loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(response.user));
  
        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: 'คุณได้ทำการเข้าสู่ระบบสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        }).then(() => {
          // Check the user role and navigate accordingly
          if (response && response.user) {
            const { role } = response.user;
            if (role === 'admin') {
              this.router.navigate(['/dashboard']).then(() => {
                // Reload the page to ensure the logout is immediate
                window.location.reload();
              });
            } else {
              this.router.navigate(['/']).then(() => {
                // Reload the page to ensure the logout is immediate
                window.location.reload();
              });
            }
          }
        });
      },
      (error: any) => {
        console.error('Login failed:', error);
        // Handle login failure
        Swal.fire({
          title: 'เข้าสู่ระบบล้มเหลว',
          text: 'กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    );
  }
  
}
