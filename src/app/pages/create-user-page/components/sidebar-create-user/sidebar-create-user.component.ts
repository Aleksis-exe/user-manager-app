import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'sidebar-create-user',
  templateUrl: './sidebar-create-user.component.html',
  styleUrls: ['./sidebar-create-user.component.scss'],
})
export class SidebarCreateUserComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  close(): void {
    this.router.navigate(['/'])
  }
}
