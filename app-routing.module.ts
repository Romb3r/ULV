import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UlvBodyComponent } from './ulv-body/ulv-body.component';
import { UlvCartComponent } from './ulv-cart/ulv-cart.component';
import { UlvPlacesComponent } from './ulv-places/ulv-places.component';

const routes: Routes = [
  { path: "", component: UlvBodyComponent },
  { path: "places", component: UlvPlacesComponent },
  { path: "cart", component: UlvCartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
