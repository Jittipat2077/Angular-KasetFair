import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';

import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {
  imgEvent: File | null = null;
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

  AddEvent(name_festival: string, 
    date_start_reservation: string, 	
    date_end_reservation: string, 	
    date_start_festival: string, 	
    date_end_festival: string, 	
    date_start_payment: string, 	
    date_end_payment: string, 	
    status_open_close: string, 
  ): void {
    const formData = new FormData();
    formData.append('name_festival', name_festival);
    formData.append('date_start_reservation',  date_start_reservation);
    formData.append('date_end_reservation', date_end_reservation);
    formData.append('date_start_festival', date_start_festival);
    formData.append('date_end_festival', date_end_festival);
    formData.append('date_start_payment', date_start_payment);
    formData.append('date_end_payment', date_end_payment);
    formData.append('status_open_close', status_open_close);
    formData.append('img_mapzone', this.imgEvent!);
    const endpoint = `${this.dataService.apiEndpoint}/add-event`;

    this.http.post(endpoint, formData).subscribe(
      (response: any) => {
        console.log('Boot added successfully:', response);

        Swal.fire({
          title: 'เพิ่มข้อมูลสําเร็จ!',
          text: `คุณได้ทำการเพิ่มข้อมูลสําเร็จ, last_idx: ${response.last_idx}`,
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
        if (fileKey === 'img_mapzone') {
          this.imgEvent = file;
        }
      };
    }
  }
  
}
