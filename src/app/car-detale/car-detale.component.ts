import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CarEntity, OwnerEntity } from '../model/car-owner';
import { ValidatorsService } from '../validators.service'
import { DataStoreService } from '../data-store.service'
@Component({
  selector: 'app-car-detale',
  templateUrl: './car-detale.component.html',
  styleUrls: ['./car-detale.component.scss']
})
export class CarDetaleComponent implements OnInit {
  OwnerCarsForm: FormGroup
  @Input() comp_index: number;
  @Input() data: any;
  @Output() newItemEvent = new EventEmitter<{status:boolean, index: number}>();
  constructor(public cd: ChangeDetectorRef, private vs: ValidatorsService, private dataStore: DataStoreService) { }


  ngOnInit(): void {
    this.init_form();
    this.OwnerCarsForm.updateValueAndValidity({emitEvent: true});  

      this.OwnerCarsForm.statusChanges.subscribe(res=>{
        if(res == 'INVALID' || res == 'PENDING'){
          this.data.status_validete = res;
          this.data.car_data = this.OwnerCarsForm.value
          this.dataStore.addCarsData(this.data)
        }
        else{
          this.data.status_validete = res;
          this.data.car_data = this.OwnerCarsForm.value
          this.dataStore.addCarsData(this.data)
        }
      })


      if(typeof this.data.car_data !== 'undefined'){
        this.OwnerCarsForm.patchValue(this.data.car_data)
        this.OwnerCarsForm.updateValueAndValidity({emitEvent: true});
        this.cd.markForCheck();
        
      }
      
  }

  killeTheWindow(){
    // this.newItemEvent.emit({status:true, index: this.data.cid})
    this.dataStore.deleteCarData({status:true, index: this.data.cid})
  }

  init_form(){
    this.OwnerCarsForm = new FormGroup({

          aManufacturerName: new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(1),
                                    ]),

          aModelName: new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(1),
                                    ]),

          aProductionYear: new FormControl('',
                                    [Validators.required,
                                    Validators.min(1990),
                                    Validators.max(new Date().getFullYear()),
                                    Validators.minLength(4),
                                    Validators.maxLength(4),
                                    Validators.pattern("^[0-9]{4}")]
                                    ),
          aLicensePlateNumber: new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(1),
                                    Validators.pattern("^[A-Z]{2}[0-9]{4}[A-Z]{2}")], [
                                    this.vs.aLicensePlateNumberServerValidator(Number(this.data.uid)),
                                    this.vs.aLicensePlateNumberLocalValidator(this.data.cid) 
                                    ],
                                    ),
      }, {
  updateOn: 'blur'
} )

  }


}
