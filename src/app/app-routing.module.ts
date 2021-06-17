import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarOwnderDetaleComponent} from './car-ownder-detale/car-ownder-detale.component';
import { OwnderListComponent } from './ownder-list/ownder-list.component'

const routes: Routes = [
  {path: '', component: OwnderListComponent},
  {path: 'car-owner', component: CarOwnderDetaleComponent},
  {path: 'car-owner/:id', component: CarOwnderDetaleComponent},
  {path: 'car-owner/:id/view', component: CarOwnderDetaleComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
