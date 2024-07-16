import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../service/data.service.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterLink],
  providers: [DataServiceService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  id: string = '';
  email: string = '';
  tel: string = '';
  role: string = '';

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

  edit(firstname: string, lastname: string, email: string, tel: string, userId: string) {
    // Check if all fields are filled
    if (!firstname || !lastname || !email || !tel || !userId) {
      Swal.fire({
        title: 'Incomplete Data!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return; // Return after showing the alert
    }

    // Prepare the data to send
    const editData = { id: userId, firstname: firstname, lastname: lastname, email: email, tel: tel };
    console.log(editData);

    // Use the correct endpoint
    const endpoint = `${this.dataService.apiEndpoint}/edit-user`;
    console.log(endpoint);
    const jsonString = JSON.stringify(editData);
    this.http.post(endpoint, jsonString, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      (response: any) => {
        console.log('Edit successful:', response);

        Swal.fire({
          title: 'User Updated!',
          text: 'User details have been successfully updated',
          icon: 'success',
          confirmButtonText: 'OK',
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
