import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ulv-dialog',
  templateUrl: './ulv-dialog.component.html',
  styleUrls: ['./ulv-dialog.component.scss']
})
export class UlvDialogComponent implements OnInit {
  constructor(public helper: HelperService, public router: Router, public dialogRef: MatDialogRef<UlvDialogComponent>) { }

  ngOnInit(): void {
    const code = localStorage.getItem('code')
    if (code != "") {
      this.helper.code = code;
    }
  }

  public login(): void {
    this.dialogRef.close()
    localStorage.setItem('code', this.helper.code)
    this.router.navigateByUrl('/items')
  }
}
