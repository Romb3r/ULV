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
  public itemsSelected: boolean = true;
  public placesSelected: boolean = false;
  public cartSelected: boolean = false;
  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  selectedTabs(event: MatTabChangeEvent) {
    console.log({ event })
  }

  changeRoute(route: string) {
    if (route == "") {
      this.itemsSelected = true;
      this.placesSelected = false;
      this.cartSelected = false;
    } else if (route == "places") {
      this.itemsSelected = false;
      this.placesSelected = true;
      this.cartSelected = false;
    } else if (route == "cart") {
      this.itemsSelected = false;
      this.placesSelected = false;
      this.cartSelected = true;
    }
    this.location.replaceState(route)
  }
}
