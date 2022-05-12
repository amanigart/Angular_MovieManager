import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  members: User[] = [];
  inactiveMembers: User[] = [];
  currentMember!: User;
  // roleOptions!: any[];
  roleValue!: boolean;
  subscriptions = new Subscription();
  roleSwitchSubscription = new Subscription();
  deleteUserSubscription = new Subscription();

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getAllMembers();
    // this.roleOptions = [{label: 'admin', value: true}, {label: 'user', value: false}];

    this.roleSwitchSubscription = this._userService.roleSwitchEvent$.subscribe({
      next: (isRoleSwitched) => {
        if (isRoleSwitched) this.getAllMembers()
      }
    });

    this.deleteUserSubscription = this._userService.deleteUserEvent$.subscribe({
      next: (isDeleted) => {
        if (isDeleted) this.getAllMembers()
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptions)
      this.subscriptions.unsubscribe();
    this.roleSwitchSubscription.unsubscribe();
    this.deleteUserSubscription.unsubscribe();
  }

  getAllMembers(): void {
    this.subscriptions.add(
      this._userService.getAllusers().subscribe({
        next: (users) => this.members = users
      })
    );
  }

  getInactiveMembers(): void {
    this.inactiveMembers = this.members.filter(u => u.isActive == false )
  }

  deleteMember(id: number): void {
    this._userService.deleteUser(id);
  }

  switchRole(id: number): void {
    this._userService.updateRole(id);
  }

}
