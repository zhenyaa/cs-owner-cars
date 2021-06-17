import { Component,
         OnInit, 
         ChangeDetectorRef, 
 } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OwnerEntity, CarEntity, CompType} from '../model/car-owner';
import { ICarOwnersService } from '../icar-owners.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DataStoreService } from '../data-store.service'


@Component({
  selector: 'app-car-ownder-detale',
  templateUrl: './car-ownder-detale.component.html',
  styleUrls: ['./car-ownder-detale.component.scss']
})
export class CarOwnderDetaleComponent implements OnInit {

  OwnerForm: FormGroup
  id: string;
  isAddMode: boolean;
  isOlnyView: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public cd: ChangeDetectorRef, 
    private api: ICarOwnersService,
    public dataStore: DataStoreService
    ) { }

  ngOnInit(): void {
    this.isOlnyView = this.router.url.includes('view')
    this.dataStore.carsData.next([])
    this.init_form()
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
          this.api.getOwnerById(Number(this.id))
              .pipe(first())
              .subscribe(x => {
                this.OwnerForm.patchValue(x)
                this.OwnerForm.updateValueAndValidity({emitEvent: true});
                this.cd.detectChanges();
                x.aCars.forEach(car_d=> this.createComponent(car_d, this.id))
              }, error=>{
                // console.log(error)
                this.router.navigate(['/'])
              });
      }
      if(this.isOlnyView){
        Object.keys(this.OwnerForm.controls).forEach(ctrl => {
          this.OwnerForm.controls[ctrl].disable();
    });
      }
  }

  addNewCar(){
    this.createComponent(0);
  }

  createComponent(comp_data, uid=null){
    this.dataStore.createComponent(comp_data, uid)
    this.cd.detectChanges()
  }

  onSubmit(){
    let ownerData:OwnerEntity = this.OwnerForm.value
    if (this.isAddMode){
      ownerData.aCars = this.dataStore.carsData.getValue().map(obj_c => obj_c.car_data)
      this.api.createOwner2(ownerData).pipe(first()).subscribe(res=> {this.router.navigate(['/'])}, error=>{console.log(error)})
    }
    else{
      ownerData.aCars = this.dataStore.carsData.getValue().map(obj_c => obj_c.car_data)
      ownerData.id = Number(this.id)
      this.api.editOwner(ownerData).pipe(first()).subscribe(res=>{this.router.navigate(['/'])}, error=>{console.log(error)})
    }
  }

  init_form(){
     this.OwnerForm = new FormGroup({

          aLastName: new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(3),
                                    // Validators.pattern("")
                                    ]
                                    ),

          aFirstName: new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(2),
                                    // Validators.pattern("")
                                    ]
                                    ),

          aMiddleName: new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(5),
                                    // Validators.pattern("")
                                    ]
                                    ),

      })  
  }
}
