import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-ulv-header',
  templateUrl: './ulv-header.component.html',
  styleUrls: ['./ulv-header.component.scss']
})
export class UlvHeaderComponent implements OnInit {
  public title: string = "";
  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  selectedTabs(event: MatTabChangeEvent) {
    console.log({ event })
  }

  changeRoute(route: string) {
    this.location.replaceState(route)
  }
}
