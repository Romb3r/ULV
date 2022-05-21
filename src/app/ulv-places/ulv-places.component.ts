import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Place {
  name: string
};

const items: Place[] = [
  {name: "Kühlschrank"},
  {name: "Froster"},
  {name: "Regal"}
]

@Component({
  selector: 'app-ulv-places',
  templateUrl: './ulv-places.component.html',
  styleUrls: ['./ulv-places.component.scss']
})
export class UlvPlacesComponent implements OnInit, AfterViewInit {
  public tableHeaders: string[] = ["place"];
  public places: string[] = ["Kühlschrank", "Froster", "Regal"];
  public placeName: string = "";
  public tableIndex: number;
  public edit: boolean;
  public rowSelected: number;
  dataSource = new MatTableDataSource<Place>(items)
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  public getValues(value: string): void {
    this.placeName = value["name"];
    this.tableIndex = items.findIndex(x => x.name == value["name"])
    this.rowSelected = this.tableIndex;
    value["name"] = this.placeName;
  }

  public addToTable(): void {
    if (this.placeName == "") {
      return
    }
    const newItem = {name: this.placeName};
    items.push(newItem);
    this.dataSource.data = items;
    this.placeName = "";

  }

  public editTableRow(): void {
    items[this.tableIndex].name = this.placeName
    this.rowSelected = null;
  }
}
