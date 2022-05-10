import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navItems!: MenuItem[];

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.navItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Admin', icon: 'pi pi-cog', routerLink: ['/admin'], visible: this.isAdmin(), items:
        [
          {label: 'Add Movie', routerLink: ['/create']}
        ]},
      { label: 'Persons', icon: 'pi pi-users', routerLink: ['/person'] },
      { label: 'Movies', icon: 'fa fa-solid fa-film', routerLink: ['/movies'] },
      { label: 'Login', icon: 'pi pi-user', routerLink: ['/login'], visible: !this.isConnected() },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: ['/register'], visible: !this.isConnected() }
    ]
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/home']);
  }

  isAdmin(): boolean {
    return this._authService.isAdmin();
  }

  isConnected(): boolean {
    return this._authService.isAuthenticated();
  }

}
