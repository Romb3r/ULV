import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UlvDialogComponent } from '../ulv-dialog/ulv-dialog.component';

@Component({
  selector: 'app-ulv-login',
  templateUrl: './ulv-login.component.html',
  styleUrls: ['./ulv-login.component.scss']
})
export class UlvLoginComponent implements OnInit {

  constructor(private helper: HelperService, private dialog: MatDialog, private router: Router) {
    const dialogRef = this.dialog.open(UlvDialogComponent, {
      width: '50%'
    });
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
