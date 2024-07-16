import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { Convert as zoneCvt, Zone } from '../model/zone.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-zone.component.html',
  styleUrl: './add-zone.component.scss'
})
export class AddZoneComponent implements OnInit {
  imgShowzone: File | null = null;
  imgMapzone: File | null = null;
  imgBase64: string | null = null;
  firstname: string = '';
  lastname: string = '';
  selectedFile: File | null = null;
  email:string="";
  id: number = 0;
  tel:string="";
  zones: Zone[] = [];

// Set to an initial value that is not feasible


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
    this.loadZones();
  }
  loadZones(): void {
    this.http.get(this.dataService.apiEndpoint + '/zone')
      .subscribe((data: any) => {
        this.zones = zoneCvt.toZone(JSON.stringify(data));
        console.log(this.zones);
      });
  }
  AddZone(name_zone: string, detail_zone: string) {
    if (!name_zone || !detail_zone || !this.imgMapzone || !this.imgShowzone) {
      Swal.fire({
        title: 'ข้อมูลไม่ครบ!',
        text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
      });
      return; // Exit the function if validation fails
    }
  
    const formData = new FormData();
    formData.append('name_zone', name_zone);
    formData.append('detail_zone', detail_zone);
    formData.append('img_mapzone', this.imgMapzone); // Use imgMapzone directly
    formData.append('img_showzone', this.imgShowzone); // Use imgShowzone directly
  
    const endpoint = `${this.dataService.apiEndpoint}/add-zone`;
  
    this.httpClient.post(endpoint, formData).subscribe(
      (response: any) => {
        console.log('Zone added successfully:', response);
        Swal.fire({
          title: 'เพิ่มข้อมูลสําเร็จ!',
          text: 'คุณได้ทำการเพิ่มข้อมูลสําเร็จ',
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
  reserveZone(id_zone: number) {
    this.router.navigate(['/addboot'], { queryParams: { id_zone } });
  }

  deleteZone(id_zone: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this zone?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `${this.dataService.apiEndpoint}/delete-zone/${id_zone}`;
        this.http.delete(apiUrl).subscribe(
          (response: any) => {
            console.log('Delete response:', response);
            if (response.message === "Zone and related boots and reservations deleted successfully") {
              Swal.fire(
                'Deleted!',
                'Zone deleted successfully',
                'success'
              );
              this.loadZones(); // Reload the zones after deletion
            } else {
              Swal.fire(
                'Failed!',
                'Failed to delete zone',
                'error'
              );
            }
          },
          (error) => {
            console.error('Delete error:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the zone',
              'error'
            );
          }
        );
      }
    });
  }

  addboot(id_zone: number) {
    this.router.navigate(['/add-boot'], { queryParams: { id_zone } });
  }

  detailBoot(id_zone: number) {
    this.router.navigate(['/detail-boot'], { queryParams: { id_zone } });
  }

  EditZone(id_zone: number) {
    this.router.navigate(['/edit-zone'], { queryParams: { id_zone } });
  }
}
