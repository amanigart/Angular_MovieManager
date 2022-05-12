import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Metrics', icon: 'pi pi-chart-line', routerLink: ['./metrics']},
      { label: 'Users', icon: 'pi pi-users',  routerLink: ['./users'] },
      { label: 'Create', icon: 'pi pi-plus',  routerLink: ['./create-movie'] }
    ];
  }

}
