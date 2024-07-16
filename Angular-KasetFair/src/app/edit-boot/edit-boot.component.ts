import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';

import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-boot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-boot.component.html',
  styleUrl: './edit-boot.component.scss'
})
export class EditBootComponent implements OnInit {
  imgBoot: File | null = null;
  firstname: string = '';
  lastname: string = '';
  id: number = 0;
  Id_Boot: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.id = user.id;
      }
      this.Id_Boot = parseInt(params['id_boot']) || 0; // If id_boot is not present, default to 0
    });
  }

  EditBoot(number_boot: string, status_boot: string, price: string, boot_size: string) {
    const formData = new FormData();
    formData.append('id_boot', this.Id_Boot.toString());
    formData.append('number_boot', number_boot);
    formData.append('status_boot', status_boot);
    if (this.imgBoot) {
      formData.append('img_boot', this.imgBoot);
    }
    formData.append('price', price);
    formData.append('boot_size', boot_size);
    const endpoint = `${this.dataService.apiEndpoint}/update-bootdetail`;
    this.http.post(endpoint, formData).subscribe(
      (response: any) => {
        console.log('Boot updated successfully:', response);
        Swal.fire({
          title: 'อัปเดตข้อมูลสําเร็จ!',
          text: 'คุณได้ทำการอัปเดตข้อมูลสําเร็จ!',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
        this.dataService.notifyRefreshNeeded();
      },
      (error) => {
        console.error('Failed to update boot:', error);
        Swal.fire({
          title: 'เพิ่มข้อมูลไม่สําเร็จ!',
          text: 'คุณได้ทำการเพิ่มข้อมูลไม่สําเร็จ',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    );
  }

  onFileSelected(event: any, fileKey: string) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (fileKey === 'img_boot') {
          this.imgBoot = file;
        }
      };
    }
  }
}
