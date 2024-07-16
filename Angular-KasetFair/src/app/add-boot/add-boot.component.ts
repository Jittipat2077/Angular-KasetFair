import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
0
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-boot',
  standalone: true,
  imports: [],
  templateUrl: './add-boot.component.html',
  styleUrl: './add-boot.component.scss'
})
export class AddBootComponent {
  imgBoot: File | null = null;
  firstname: string = '';
  lastname: string = '';
  desiredIdZone: number = 0;
  email: string = '';
  id: number = 0;
  tel: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
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
      this.desiredIdZone = parseInt(params['id_zone']) || 0; // Default to 0 if id_zone is not present
    });
  }

  AddBoot(number_boot: string, price: string, boot_size: string): void {
    const formData = new FormData();
    formData.append('number_boot', number_boot);
    formData.append('price', price);
    formData.append('boot_size', boot_size);
    formData.append('img_boot', this.imgBoot!);
    formData.append('id_zone', this.desiredIdZone.toString());

    const endpoint = `${this.dataService.apiEndpoint}/add-boot`;

    this.http.post(endpoint, formData).subscribe(
      (response: any) => {
        console.log('Boot added successfully:', response);
        Swal.fire({
          title: 'เพิ่มข้อมูลสําเร็จ!',
          text: 'คุณได้ทำการเพิ่มข้อมูลสําเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
      },
      (error) => {
        console.error('Failed to add boot:', error);
        Swal.fire({
          title: 'เพิ่มข้อมูลไม่สําเร็จ!',
          text: 'คุณได้ทำการเพิ่มข้อมูลไม่สําเร็จ',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    );
  }

  onFileSelected(event: any, fileKey: string): void {
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
