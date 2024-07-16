import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { Convert as BootCvt, Boot } from '../model/boot.model';
import { Convert as zoneCvt, Zone } from '../model/zone.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail-boot',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './detail-boot.component.html',
  styleUrl: './detail-boot.component.scss'
})
export class DetailBootComponent {
  firstname: string = '';
  lastname: string = '';
  email:string="";
  id: number = 0;
  tel:string="";
  boots: Boot[] = [];
  id_boot: number=0;
  desiredIdZone: number = 0;
  zones: Zone[] = []; // Set to an initial value that is not feasible
  checkedCount: number = 0;
  selectedBootIds: number[] = [];
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
        // this.email = user.email ;
        // this.email = user.email ;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.id = user.id;
      }
      this.id_boot = parseInt(params['id_boot'])
      this.desiredIdZone = parseInt(params['id_zone']) || 0; // If id_zone is not present, default to 0
      if (this.desiredIdZone !== 0) {
        this.loadBootData();
        this.loadZoneData();
      }
    });
  }

  deleteBoot(id_boot: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this boot?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `${this.dataService.apiEndpoint}/delete-boot/${id_boot}`;
        this.http.delete(apiUrl).subscribe(
          (response: any) => {
            console.log('Delete response:', response);
            if (response.message === "Boot deleted successfully") {
              Swal.fire(
                'Deleted!',
                'Boot has been deleted.',
                'success'
              );
              this.loadBootData(); // Reload the boots after deletion
            } else {
              Swal.fire(
                'Failed!',
                'Failed to delete boot.',
                'error'
              );
            }
          },
          (error) => {
            console.error('Delete error:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the boot.',
              'error'
            );
          }
        );
      }
    });
  }
  
  loadBootData(): void {
    this.http
      .get(this.dataService.apiEndpoint + '/boot/' + this.desiredIdZone)
      .subscribe((data: any) => {
        this.boots = BootCvt.toBoot(JSON.stringify(data));
        console.log(this.boots);
      });
  }
  loadZoneData(): void {
    this.http
      .get(this.dataService.apiEndpoint + '/zone/' + this.desiredIdZone)
      .subscribe((data: any) => {
        this.zones = zoneCvt.toZone(JSON.stringify(data));
        console.log(this.zones);
      });
  }
  EditBoot(id_boot: number) {
    this.router.navigate(['/edit-boot'], { queryParams: { id_boot } });
  }
}
