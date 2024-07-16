import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';

import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-zone.component.html',
  styleUrl: './edit-zone.component.scss'
})
export class EditZoneComponent {
  imgShowzone: File | null = null;
  imgMapzone: File | null = null;
  imgBase64: string | null = null;
  firstname: string = '';
  lastname: string = '';
  selectedFile: File | null = null;
  email:string="";
  id: number = 0;
  tel:string="";
  desiredIdZone: number = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    private httpClient: HttpClient,
  ) {
    // this.http
    //   .get(this.dataService.apiEndpoint + '/boot-test')
    //   .subscribe((data: any) => {
    //     this.boots = BootCvt.toBoot(
    //       JSON.stringify(data)
    //     );
    //     console.log(this.boots);
    //   });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        // this.email = user.email ;
        // this.email = user.email ;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.id = user.id;
      }
      this.desiredIdZone = parseInt(params['id_zone']) || 0; // If id_zone is not present, default to 0
    });
  }
  EditZone(name_zone: string, detail_zone: string) {
    const formData = new FormData();
    formData.append('id_zone', this.desiredIdZone.toString());
    formData.append('name_zone', name_zone);
    formData.append('detail_zone', detail_zone);
    formData.append('img_mapzone', this.imgMapzone!); // Use imgMapzone directly
    formData.append('img_showzone', this.imgShowzone!); // Use imgShowzone directly

    const endpoint = `${this.dataService.apiEndpoint}/update-zone`;
  
    this.httpClient.post(endpoint, formData).subscribe(
      (response: any) => {
        console.log('Zone added successfully:', response);
        Swal.fire({
          title: 'อัปเดตข้อมูลสําเร็จ!',
          text: 'คุณได้ทำการอัปเดตข้อมูลสําเร็จ!',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          
        });
        this.dataService.notifyRefreshNeeded();

        // Handle success
      },
      (error) => {
        console.error('Failed to add zone:', error);
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
        // Store the base64 string of the image
        if (fileKey === 'img_mapzone') {
          this.imgMapzone = file;
        } else if (fileKey === 'img_showzone') {
          this.imgShowzone = file;
        }
      };
    }
  }
}
