import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, OnDestroy {
  navItems!: MenuItem[];
  isAdminSubscription!: Subscription;
  isAdmin!: boolean;
  isUserSubscription!: Subscription;
  isUser!: boolean;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.isUser = localStorage.getItem('token') != null
    this.isAdmin = localStorage.getItem('isAdmin') == 'true'

    this.isAdminSubscription = this._authService.isAdminEvent$.subscribe({
      next: (isAdminRole) => {
        this.isAdmin = isAdminRole
        this._authService.emitIsAdmin()
        this.getNav();
      }
    });
    this.isUserSubscription = this._authService.isUserEvent$.subscribe({
      next: (isUserRole) => {
        this.isUser = isUserRole;
        this._authService.emitIsUser()
        this.getNav();
      }
    });
    this.getNav();
  }

  ngOnDestroy(): void {
    this.isAdminSubscription.unsubscribe();
    this.isUserSubscription.unsubscribe();
  }

  getNav(): void {
    this.navItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Admin', icon: 'pi pi-cog', routerLink: ['/admin'], visible: this.isAdmin },
      { label: 'Persons', icon: 'pi pi-users', routerLink: ['/person'] },
      { label: 'Movies', icon: 'fa fa-solid fa-film', routerLink: ['/movies'] },
      { label: 'Login', icon: 'pi pi-user', routerLink: ['/login'], visible: !this.isUser },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: ['/register'], visible: !this.isUser }
    ]
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/home']);
  }

  // isAdmin(): boolean {
  //   return this._authService.isAdmin();
  // }

  // isConnected(): boolean {
  //   return this._authService.isAuthenticated();
  // }

}
