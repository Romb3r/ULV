import { NONE_TYPE } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Item {
  name: string,
  amount: number,
  expireDate: string,
  place: string
};

const items: Item[] = [
  {name: "Banane", amount: 4, expireDate: "4.6.2022", place: "Regal"},
  {name: "Apfel", amount: 6, expireDate: "4.6.2022", place: "Regal"},
  {name: "Milch", amount: 1, expireDate: "4.6.2022", place: "Kühlschrank"},
  {name: "Salami", amount: 1, expireDate: "4.6.2022", place: "Kühlschrank"},
  {name: "Pizza", amount: 2, expireDate: "4.6.2022", place: "Froster"}
]

@Component({
  selector: 'app-ulv-body',
  templateUrl: './ulv-body.component.html',
  styleUrls: ['./ulv-body.component.scss']
})
export class UlvBodyComponent implements OnInit, AfterViewInit {
  public tableHeaders: string[] = ["name", "amount", "place", "expireDate"];
  public places: string[] = ["Kühlschrank", "Froster", "Regal"];
  public itemType: string = "";
  public itemAmount: number;
  public itemPlace = "";
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
    this.itemPlace = value["place"];
    this.tableIndex = items.findIndex(x => x.name == value["name"])
    this.rowSelected = this.tableIndex;
    value["name"] = this.itemType;
    value["amount"] = this.itemAmount;
    value["place"] = this.itemPlace;
  }

  public addToTable(): void {
    if (this.itemType == "" || this.itemAmount == null || this.itemPlace == "") {
      return
    }
    let today = new Date();
    // current date + weeks * days
    today.setDate(today.getDate() + 2 * 7);
    let str_today = today.toLocaleDateString()
    const newItem = {name: this.itemType, amount: this.itemAmount, expireDate: str_today, place: this.itemPlace};
    items.push(newItem);
    this.dataSource.data = items;
    this.itemType = "";
    this.itemAmount = null;
    this.itemPlace = "";
  }

  public changeClient(value: string): void {
    this.itemPlace = value;
  }

  public editTableRow(): void {
    items[this.tableIndex].name = this.itemType
    items[this.tableIndex].amount = this.itemAmount
    items[this.tableIndex].place = this.itemPlace
    this.rowSelected = null;
  }
}
