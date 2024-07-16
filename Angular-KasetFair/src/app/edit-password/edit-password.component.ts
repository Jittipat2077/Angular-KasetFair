import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../service/data.service.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterLink],
  providers: [DataServiceService],
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  id: string = '';
  email: string = '';
  tel: string = '';
  role: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.id = user.id;
      this.role = user.role;
      this.email = user.email;
      this.tel = user.tel;
    }
  }

  edit() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        title: 'เปลี่ยนผ่านไม่สําเร็จ!',
        text: 'รหัสไม่ตรงกัน',
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    // Check if password field is filled
    if (!this.password || !this.id) {
      Swal.fire({
        title: 'เปลี่ยนผ่านไม่สําเร็จ',
        text: 'กรุณากรอกรหัสผ่านที่ต้องการเปลี่ยน',
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    // Prepare the data to send
    const editData = { id: this.id, password: this.password };
    console.log(editData);

    // Use the correct endpoint
    const endpoint = `${this.dataService.apiEndpoint}/edit-password`;
    console.log(endpoint);
    const jsonString = JSON.stringify(editData);
    this.http.post(endpoint, jsonString, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      (response: any) => {
        console.log('Edit successful:', response);

        Swal.fire({
          title: 'สําเร็จ!',
          text: 'ทําการเปลี่ยนรหัสผ่านสําเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/user-profile']); // Redirect to user profile or relevant page
          }
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while updating user details. Please try again later',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('Error updating user details:', error);
      }
    );
  }
}
