import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'header-layout',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = ''
  @Input() username: string = ''
  @Input() icon: string = ''

  constructor() {}

  ngOnInit(): void {}
}
