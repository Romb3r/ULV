import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from '../helper.service';
import { DatePipe } from '@angular/common';


export interface Item {
  item: {
    name: string
  },
  amount: number,
  expireAt: string
};

@Component({
  selector: 'app-ulv-cart',
  templateUrl: './ulv-cart.component.html',
  styleUrls: ['./ulv-cart.component.scss']
})
export class UlvCartComponent implements OnInit, AfterViewInit {
  public tableHeaders: string[] = ["name", "amount", "addbtn", " "];
  public items: Item[] = []
  public itemType: string = "";
  public itemAmount: number;
  public tableIndex: number;
  public edit: boolean;
  public rowSelected: number;
  dataSource = new MatTableDataSource<Item>([])
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private helper: HelperService, private datepipe: DatePipe) { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.updateTable()
    this.dataSource.paginator = this.paginator
  }

  public fetchCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('https://ulv-api.fly.dev/v1/cart-items', {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
<<<<<<< HEAD
        "Code": this.helper.code
=======
        "X-Group-Key": this.helper.code
>>>>>>> ou_changes
      })
    });
  }

  public getValues(value: string): void {
    this.itemType = value["item"]["name"];
    this.itemAmount = value["amount"];
    this.tableIndex = this.items.findIndex(x => x.item.name == value["name"])
    value["name"] = this.itemType;
    value["amount"] = this.itemAmount;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].item.name == value["name"]) {
        this.tableIndex = i;
        break;
      }
    }
    this.rowSelected = this.tableIndex;
  }

  public async addToTable() {
    if (this.itemType == "" || this.itemAmount == null) {
      return
    }
    let date = new Date()
    date.setDate(date.getDate() + 2 * 7);
    let formattedDate = this.datepipe.transform(date, "YYYY-MM-dd")
    await this.helper.postCartItem({amount: Number(this.itemAmount), newItem: {name: this.itemType, expireAt: formattedDate}});
    this.updateTable()
    this.itemType = "";
    this.itemAmount = null;
  }

  public async editTableRow(){
    this.dataSource.data[this.tableIndex].item.name = this.itemType
    this.dataSource.data[this.tableIndex].amount = this.itemAmount
    await this.helper.patchCartItem({amount: Number(this.itemAmount)}, this.dataSource.data[this.tableIndex]["uuid"])
  }

  public async deleteCartItem(element: string) {
    let index = this.dataSource.data.findIndex(x => x.item.name == element["item"]["name"])
    await this.helper.deleteCartItem(this.dataSource.data[index]["uuid"])
    this.updateTable()
  }

  public updateTable() {
    this.fetchCartItems().subscribe((items) => {
      this.dataSource.data = items
    })
  }

  public async addToItems(element: string) {
    let index = this.dataSource.data.findIndex(x => x.item.name == element["item"]["name"])
    await this.helper.putCartItem(this.dataSource.data[index]["uuid"])
    await this.helper.deleteCartItem(this.dataSource.data[index]["uuid"])
    this.updateTable()
  }
}
