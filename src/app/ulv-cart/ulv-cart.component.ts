import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Item {
  name: string,
  amount: number
};

const items: Item[] = []

@Component({
  selector: 'app-ulv-cart',
  templateUrl: './ulv-cart.component.html',
  styleUrls: ['./ulv-cart.component.scss']
})
export class UlvCartComponent implements OnInit, AfterViewInit {
  public tableHeaders: string[] = ["name", "amount"];
  public itemType: string = "";
  public itemAmount: number;
  public tableIndex: number;
  public edit: boolean;
  public rowSelected: number;
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
    this.tableIndex = items.findIndex(x => x.name == value["name"])
    this.rowSelected = this.tableIndex;
    value["name"] = this.itemType;
    value["amount"] = this.itemAmount;
  }

  public addToTable(): void {
    if (this.itemType == "" || this.itemAmount == null) {
      return
    }
    const newItem = {name: this.itemType, amount: this.itemAmount};
    items.push(newItem);
    this.dataSource.data = items;
    this.itemType = "";
    this.itemAmount = null;

  }

  public editTableRow(): void {
    items[this.tableIndex].name = this.itemType
    items[this.tableIndex].amount = this.itemAmount
    this.rowSelected = null;
  }
}
