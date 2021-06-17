import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, tap, filter, reduce, scan, flatMap } from 'rxjs/operators';
import { ICarOwnersService } from '../icar-owners.service';
import { OwnerEntity } from '../model/car-owner'
@Component({
  selector: 'app-ownder-list',
  templateUrl: './ownder-list.component.html',
  styleUrls: ['./ownder-list.component.scss']
})
export class OwnderListComponent implements OnInit {
  displayedColumns: string[] = ['aLastName','aFirstName','aMiddleName', 'carsQuant']; // add id for show item.id
  dataSource:Observable<OwnerEntity[]>
  selectedRowIndex: number = -1;
  constructor(private api: ICarOwnersService) { }

  ngOnInit(): void {
    this.dataSource = this.api.getOwners().pipe(
      // tap(res=>console.log(res))
      )
  }

  highlight(row){
    this.selectedRowIndex = row.id;
  }
  funcDeleteOwner(){
   this.dataSource = this.api.deleteOwner(this.selectedRowIndex)
  }

}
