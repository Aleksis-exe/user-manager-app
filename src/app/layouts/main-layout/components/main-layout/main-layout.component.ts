import { Component, Input, OnInit } from '@angular/core'
import setup from 'package.json'

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  version: string = ''
  author: string = ''

  constructor() {}

  ngOnInit(): void {
    this.version = setup.version.toString()
    this.author = setup.author.toString()
  }
}
