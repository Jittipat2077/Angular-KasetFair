import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import {Convert as zoneCvt,Zone,} from '../model/zone.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [DataServiceService],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email:string="";
  tel:string="";
  role:string="";
  id:string='';
  zones: Zone[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
        private route: ActivatedRoute,
      private dataService: DataServiceService,
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.email = user.email ;
      this.tel = user.tel;
      // this.id = user.id;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.id = user.id;
      this.role = user.role;
    }

    this.http
      .get(this.dataService.apiEndpoint + '/zone')
      .subscribe((data: any) => {
        this.zones = zoneCvt.toZone(JSON.stringify(data));
        console.log(this.zones);
      });
  }

  reserveZone(id_zone: number) {
        this.router.navigate(['/boot'], {
          queryParams: {
            id_zone: id_zone,
            // firstname: this.firstname,
            // lastname: this.lastname
          },
          // replaceUrl: true // This will replace the current URL in the browser history
        });
      }
    }


// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RouterLink } from '@angular/router';
// import { DataServiceService } from '../service/data.service.service';
// import {Convert as zoneCvt,Zone,} from '../model/zone.model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-index',
//   standalone: true,
//   imports: [RouterLink, CommonModule],
//   providers: [DataServiceService],
//   templateUrl: './index.component.html',
//   styleUrls: ['./index.component.scss']
// })
// export class IndexComponent {
//   firstname: string = '';
//   lastname: string = '';
//   id: string = '';
//   zones: Zone[] = [];
//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private route: ActivatedRoute,
//     private dataService: DataServiceService,
//   ) {
//     this.http
//       .get(this.dataService.apiEndpoint + '/zone')
//       .subscribe((data: any) => {
//         this.zones = zoneCvt.toZone(
//           JSON.stringify(data)
//         );
//         console.log(this.zones);
//       });
//   }
//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.firstname = params['firstname'];
//       this.lastname = params['lastname'];
//       this. id = params['id'];
//     });
//   }
//   reserveZone(id_zone: number) {
//     this.router.navigate(['/boot'], {
//       queryParams: {
//         id_zone: id_zone,
//         id: this.id,
//         firstname: this.firstname,
//         lastname: this.lastname
//       }, // This will replace the current URL in the browser history
//     });
//   }
  
// }
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RouterLink } from '@angular/router';

// import { DataServiceService } from '../service/data.service.service';
// import {Convert as zoneCvt,Zone,} from '../model/zone.model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-index',
//   standalone: true,
//   imports: [RouterLink, CommonModule],
//   providers: [DataServiceService],
//   templateUrl: './index.component.html',
//   styleUrls: ['./index.component.scss']
// })
// export class IndexComponent {
//   firstname: string = '';
//   lastname: string = '';
//   zones: Zone[] = [];

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private route: ActivatedRoute,
//     private dataService: DataServiceService,
//   ) {
//     this.http
//     .get(this.dataService.apiEndpoint + '/zone')
//     .subscribe((data: any) => {
//       this.zones = zoneCvt.toZone(
//         JSON.stringify(data)
//       );
//       console.log(this.zones);
//     });
//    }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.firstname = params['firstname'];
//       this.lastname = params['lastname'];
//     });
//   }

//   reserveZone(id_zone: number) {
//     this.router.navigate(['/boot'], {
//       queryParams: {
//         id_zone: id_zone,
//         firstname: this.firstname,
//         lastname: this.lastname
//       },
//       replaceUrl: true // This will replace the current URL in the browser history
//     });
//   }
// }
