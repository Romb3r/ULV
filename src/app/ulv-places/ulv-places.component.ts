import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from '../helper.service';


export interface Place {
  name: string
};

@Component({
  selector: 'app-ulv-places',
  templateUrl: './ulv-places.component.html',
  styleUrls: ['./ulv-places.component.scss']
})
export class UlvPlacesComponent implements OnInit, AfterViewInit {
  public places: Place[] = []
  public tableHeaders: string[] = ["place", "stored", "deletePlaceBtn"];
  public placeName: string = "";
  public placeUuid: string = "";
  public tableIndex: number;
  public edit: boolean;
  public rowSelected: number;
  dataSource = new MatTableDataSource<Place>([])
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private helper: HelperService) { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.updateTable()
    this.dataSource.paginator = this.paginator
    
  }

  public fetchPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('https://ulv-api.fly.dev/v1/places', {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil")
      })
    });
  }

  public getValues(value: string): void {
    this.placeUuid = value["uuid"]
    this.placeName = value["name"];
    this.tableIndex = this.places.findIndex(x => x.name == value["name"])
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].name == value["name"]) {
        this.tableIndex = i;
        break;
      }
    }
    this.rowSelected = this.tableIndex;
  }

  public async addToTable() {
    if (this.placeName == "") {
      return
    }
    let postBody = {name: this.placeName}
    await this.helper.postPlace(postBody)
    this.updateTable()
    this.places.push(postBody);
    this.placeName = "";
  }

  public async editTableRow() {
    this.dataSource.data[this.tableIndex]["name"] = this.placeName
    await this.helper.patchPlace({name: this.placeName}, this.placeUuid)
    this.rowSelected = null;
    this.placeUuid = "";
  }

  public async deletePlace(element: string) {
    let index = this.dataSource.data.findIndex(x => x.name == element["name"])
    await this.helper.deletePlace(this.dataSource.data[index]["uuid"])
    this.updateTable()
  }

  public updateTable() {
    this.fetchPlaces().subscribe((places) => {
      this.dataSource.data = places;
    });
  }
}
