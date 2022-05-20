import { NONE_TYPE } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Item {
  name: string,
  amount: number,
  expireDate: Date,
  place: string
};

const items: Item[] = [

]

@Component({
  selector: 'app-ulv-body',
  templateUrl: './ulv-body.component.html',
  styleUrls: ['./ulv-body.component.scss']
})
export class UlvBodyComponent implements OnInit, AfterViewInit {
  public tableHeaders: string[] = ["name", "amount", "place", "expireDate"];
  public places: string[] = ["Kühlschrank", "Froster", "Regal"];
  public itemType: string = ""
  public itemAmount: number
  public itemPlace = ""
  dataSource = new MatTableDataSource<Item>(items)
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor() { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  public getValues(value: string): void {
    this.itemType = value["name"];
    this.itemAmount = value["amount"];
    this.itemPlace = value["place"];
  }

  public addToTable(): void {
    const newItem = {name: this.itemType, amount: this.itemAmount, expireDate: new Date, place: this.itemPlace};
    items.push(newItem);
    this.dataSource.data = items;
    this.itemType = "";
    this.itemAmount = null;
    this.itemPlace = "";
  }

  public changeClient(value: string): void {
    this.itemPlace = value;
  }
}
