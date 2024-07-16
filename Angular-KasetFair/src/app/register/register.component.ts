import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../service/data.service.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule,RouterLink ],
  providers: [DataServiceService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private dataService: DataServiceService,
    private httpClient: HttpClient,
    private router: Router
  ) { }
  register(firstname: string, lastname: string, tel: string, email: string, password: string) {
    // ตรวจสอบว่าข้อมูลทุกช่องถูกกรอกครบหรือไม่
    if (!firstname || !lastname || !tel || !email || !password) {
      Swal.fire({
        title: 'ข้อมูลไม่ครบ!',
        text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
      return; 
    }
    const registerData = { email: email, password: password, firstname: firstname ,lastname: lastname,tel: tel, };
    console.log(registerData);
    // ใช้ endpoint ที่ถูกต้อง
    const endpoint = `${this.dataService.apiEndpoint}/user`;
    console.log(endpoint);
    let jsonString = JSON.stringify(registerData);
    this.httpClient.post(this.dataService.apiEndpoint + '/user', jsonString).subscribe(
      (response: any) => {
        console.log('Register successful:', response);
  
        Swal.fire({
          title: 'สมัครสมาชิก!',
          text: 'คุณได้ทำการเข้าสมัครสมาชิกสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']); // นำไปยังหน้า login
          }
        });
      },
      (error) => {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'อีเมลนี้มีการใช้งานเเล้ว',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
        console.error('เกิดข้อผิดพลาดในการสมัครสมาชิก:', error);
      }
    );
  }
  
}
