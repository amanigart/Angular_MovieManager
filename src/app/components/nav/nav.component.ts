import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navItems!: MenuItem[];

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.navItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Persons', icon: 'pi pi-list', routerLink: ['/person'] },
      { label: 'Movies', icon: 'pi pi-list', routerLink: ['/movies'] },
      { label: 'Login', icon: 'pi pi-user', routerLink: ['/login'] },
      { label:'Register', icon: 'pi pi-user-plus', routerLink: ['/register'] }
    ]
  }

  logout(): void {
    this._authService.logout();
  }

}
