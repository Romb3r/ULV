import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from '../helper.service';
import { DatePipe } from '@angular/common';


export interface Item {
  name: string,
  amount: number,
  expireAt: string,
  place: string
};

let items: Item[] = []

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
  dataSource = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private helper: HelperService, private datepipe: DatePipe) { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.fetchCartItems().subscribe((items) => {
      this.dataSource.data = items
      console.log(this.dataSource.data)
    })
    this.dataSource.paginator = this.paginator
  }

  public fetchCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('https://ulv-api.fly.dev/v1/cart-items', {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil")
      })
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
    this.itemType = value["item"]["name"];
    this.itemAmount = value["amount"];
    this.tableIndex = items.findIndex(x => x.name == value["name"])
    this.rowSelected = this.tableIndex;
    value["name"] = this.itemType;
    value["amount"] = this.itemAmount;
  }

  public async addToTable() {
    if (this.itemType == "" || this.itemAmount == null) {
      return
    }
    let date = new Date()
    date.setDate(date.getDate() + 2 * 7);
    let formattedDate = this.datepipe.transform(date, "YYYY-MM-dd")
    const newItem = {name: this.itemType, amount: this.itemAmount, expireAt: null, place: null};
    await this.helper.postItem({name: this.itemType, amount: 0, expireAt: null, place: null});
    //await this.fetchItems();
    //items.push(newItem);
    this.dataSource.data.push(items);
    this.itemType = "";
    this.itemAmount = null;

  }

  public editTableRow(): void {
    items[this.tableIndex].name = this.itemType
    items[this.tableIndex].amount = this.itemAmount
    this.rowSelected = null;
  }
}
