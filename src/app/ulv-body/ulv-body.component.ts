import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { HelperService } from '../helper.service';
import { DatePipe } from '@angular/common';

export interface Item {
  name: string,
  amount: number,
  expireAt: string,
  place: string
};

export interface Place {
  uuid: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  items: any[]
}

@Component({
  selector: 'app-ulv-body',
  templateUrl: './ulv-body.component.html',
  styleUrls: ['./ulv-body.component.scss']
})
export class UlvBodyComponent implements OnInit, AfterViewInit {
  public tableHeaders: string[] = ["name", "amount", "place", "expireDate", " "];
  public places: Place[] = [];
  public items: any[] = []
  public itemType: string = "";
  public itemAmount: number;
  public itemPlace = "";
  public itemExpireDate = "";
  public tableIndex: number;
  public edit: boolean;
  public rowSelected: number;
  dataSource = new MatTableDataSource<Item>([])
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private helper: HelperService, private datepipe: DatePipe) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fetchItems().subscribe((items) => {
      this.dataSource.data = items;
    });
    this.fetchPlaces().subscribe((places) => {
      this.places = places;
    });
    this.dataSource.paginator = this.paginator
  }

  public fetchItems(): Observable<Item[]> {
    return this.http.get<Item[]>('https://ulv-api.fly.dev/v1/items', {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil")
      })
    });
  }

  public fetchPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('https://ulv-api.fly.dev/v1/places', {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil")
      })
    });
  }

  public getValues(value: string): void {
    try {
      this.itemType = value["name"];
      this.itemAmount = value["amount"];
      this.itemExpireDate = value["expireAt"];
      this.itemPlace = value["place"];
    }
    catch {
    }
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].name == value["name"]) {
        this.tableIndex = i;
        break;
      }
    }
    this.rowSelected = this.tableIndex;
  }

  public async addToTable() {
    if (this.itemType == "" || this.itemAmount == null || this.itemPlace["name"] == "") {
      return
    }
    let today = new Date();
    // current date + weeks * days
    today.setDate(today.getDate() + 2 * 7);
    let formattedDate = this.datepipe.transform(today, 'YYYY-MM-dd HH:MM:00.000')
    console.log(formattedDate)
    const newItem = {name: this.itemType, amount: Number(this.itemAmount), expireAt: formattedDate, place: {uuid: this.itemPlace["uuid"]}};
    this.dataSource.data.push({name: this.itemType, amount: Number(this.itemAmount), expireAt: formattedDate, place: this.itemPlace});
    this.dataSource._updateChangeSubscription()
    this.itemType = "";
    this.itemAmount = null;
    this.itemPlace = "";
    await this.helper.postItem(newItem)
  }

  public changeClient(value: string): void {
    this.itemPlace = value;
  }

  public async editTableRow() {
    this.dataSource.data[this.tableIndex]["name"] = this.itemType
    this.dataSource.data[this.tableIndex]["amount"] = this.itemAmount
    this.dataSource.data[this.tableIndex]["place"] = this.itemPlace
    let postBody = {name: this.dataSource.data[this.tableIndex]["name"], amount: Number(this.dataSource.data[this.tableIndex]["amount"]),
                expireAt: this.itemExpireDate, place: {uuid: this.itemPlace["uuid"]}}
    await this.helper.patchItem(postBody, this.dataSource.data[this.tableIndex]["uuid"])
    this.rowSelected = null;
  }

  public async deleteItem(element: string) {
    let index = this.dataSource.data.findIndex(x => x.name == element["name"])
    await this.helper.deleteItem(this.dataSource.data[index]["uuid"])
    this.dataSource.data.splice(index, 1)
    this.dataSource._updateChangeSubscription()
    
  }
}
