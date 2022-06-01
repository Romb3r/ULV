import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UlvHeaderComponent } from './ulv-header/ulv-header.component';
import { UlvBodyComponent } from './ulv-body/ulv-body.component';
import { UlvPlacesComponent } from './ulv-places/ulv-places.component';
import { UlvCartComponent } from './ulv-cart/ulv-cart.component';

// Material Design
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    UlvHeaderComponent,
    UlvBodyComponent,
    UlvPlacesComponent,
    UlvCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [UlvPlacesComponent, UlvBodyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
