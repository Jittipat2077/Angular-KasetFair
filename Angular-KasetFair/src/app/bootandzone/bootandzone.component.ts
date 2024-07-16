import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { Convert as zoneCvt, Zone } from '../model/zone.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bootandzone',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './bootandzone.component.html',
  styleUrl: './bootandzone.component.scss'
})
export class BootandzoneComponent implements OnInit, OnDestroy {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  tel: string = '';
  role: string = '';
  id: string = '';
  zones: Zone[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataServiceService,
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadZones();

    this.subscription = this.dataService.refreshNeeded.subscribe(() => {
      this.loadZones();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUserData(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.email = user.email;
      this.tel = user.tel;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.id = user.id;
      this.role = user.role;
    }
  }

  loadZones(): void {
    this.http.get(this.dataService.apiEndpoint + '/zone')
      .subscribe((data: any) => {
        this.zones = zoneCvt.toZone(JSON.stringify(data));
        console.log(this.zones);
      });
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
