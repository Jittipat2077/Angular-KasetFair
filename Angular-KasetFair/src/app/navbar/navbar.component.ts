import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataServiceService } from '../service/data.service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  id:string='';
  role:string='';
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.id = user.id;
      this.role = user.role;
      
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { DataServiceService } from '../service/data.service.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterLink,CommonModule ],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.scss'
// })
// export class NavbarComponent implements OnInit {
//   firstname: string = '';
//   lastname: string = '';
//   id:string='';


//   constructor(
//     private http: HttpClient,
//     private router: Router,
//         private route: ActivatedRoute,
//       private dataService: DataServiceService,
//   ) {}

//   ngOnInit(): void {
//     const userData = localStorage.getItem('userData');
//     if (userData) {
//       const user = JSON.parse(userData);
//       this.firstname = user.firstname;
//       this.lastname = user.lastname;
//       this.id = user.id;
//     }
//   }
//     logout(): void {
//       // Clear user data from localStorage

//       localStorage.removeItem('userData');
  
//       // Navigate to login page
//       this.router.navigate(['/login']);
//     }

//   // reserveZone(id_zone: number) {
//   //       this.router.navigate(['/boot'], {
//   //         queryParams: {
//   //           id_zone: id_zone,
//   //           firstname: this.firstname,
//   //           lastname: this.lastname
//   //         },
//   //         // replaceUrl: true // This will replace the current URL in the browser history
//   //       });
//   //     }
//   }

