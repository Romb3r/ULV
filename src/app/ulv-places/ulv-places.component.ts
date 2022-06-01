import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Place {
  name: string
};



@Component({
  selector: 'app-ulv-places',
  templateUrl: './ulv-places.component.html',
  styleUrls: ['./ulv-places.component.scss']
})
export class UlvPlacesComponent implements OnInit, AfterViewInit {
  public places: Place[] = [
    {name: "Kühlschrank"},
    {name: "Froster"},
    {name: "Regal"}
  ]
  public tableHeaders: string[] = ["place", " "];
  public placeName: string = "";
  public tableIndex: number;
  public edit: boolean;
  public rowSelected: number;
  dataSource = new MatTableDataSource<Place>(this.places)
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  public getValues(value: string): void {
    this.placeName = value["name"];
    this.tableIndex = this.places.findIndex(x => x.name == value["name"])
    this.rowSelected = this.tableIndex;
    value["name"] = this.placeName;
  }

  public addToTable(): void {
    if (this.placeName == "") {
      return
    }
    const newItem = {name: this.placeName};
    this.places.push(newItem);
    this.dataSource.data = this.places;
    this.placeName = "";

  }

  public editTableRow(): void {
    this.places[this.tableIndex].name = this.placeName
    this.rowSelected = null;
  }

  public deletePlace(element: string): void {
    this.places.splice(this.places.findIndex(x => x.name == element["name"]), 1)
    this.dataSource._updateChangeSubscription()
  }
}
