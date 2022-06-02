import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { HelperService } from '../helper.service';

export interface Item {
  name: string,
  amount: number,
  expireDate: string,
  place: string
};

@Component({
  selector: 'app-ulv-body',
  templateUrl: './ulv-body.component.html',
  styleUrls: ['./ulv-body.component.scss']
})
export class UlvBodyComponent implements OnInit, AfterViewInit {
  public tableHeaders: string[] = ["name", "amount", "place", "expireDate", " "];
  public places: string[] = ["Kühlschrank", "Froster", "Regal"];
  public items: any[] = []
  public itemType: string = "";
  public itemAmount: number;
  public itemPlace = "";
  public tableIndex: number;
  public edit: boolean;
  public rowSelected: number;
  dataSource = new MatTableDataSource<Item>([])
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
    this.fetchItems().subscribe((items) => {
      this.dataSource.data = items;
    });
  }

  public fetchItems(): Observable<Item[]> {
    return this.http.get<Item[]>('https://ulv-api.fly.dev/v1/items', {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil")
      })
    });
  }

  public getValues(value: string): void {
    this.itemType = value["name"];
    this.itemAmount = value["amount"];
    this.itemPlace = value["place"];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].name == value["name"]) {
        this.tableIndex = i;
        break;
      }
    }
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
    this.items.push(newItem);
    this.dataSource.data = this.items;
    this.itemType = "";
    this.itemAmount = null;
    this.itemPlace = "";
  }

  public changeClient(value: string): void {
    this.itemPlace = value;
  }

  public editTableRow(): void {
    console.log(this.tableIndex)
    this.dataSource.data[0][this.tableIndex]["name"] = this.itemType
    this.dataSource.data[0][this.tableIndex]["amount"] = this.itemAmount
    this.dataSource.data[0][this.tableIndex]["place"] = this.itemPlace
    this.rowSelected = null;
  }

  public deleteItem(element: string): void {
    this.items.splice(this.items.findIndex(x => x.name == element["name"]), 1)
    this.dataSource._updateChangeSubscription()
  }
}
