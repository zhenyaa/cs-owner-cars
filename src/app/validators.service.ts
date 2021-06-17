import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { of, Observable, from } from 'rxjs';
import { CarEntity, OwnerEntity } from './model/car-owner';
import { ICarOwnersService } from './icar-owners.service';
import { map, mergeMap, mergeAll, toArray, tap, filter, first} from 'rxjs/operators';
import {DataStoreService } from './data-store.service';
@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private api: ICarOwnersService, private dataStore: DataStoreService) { }

  aLicensePlateNumberServerValidator(uid: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return this.api.getOwners().pipe(
    map(owners => owners.filter(owner => owner.id !== uid)),  // убрать из запроса самого себя, если редактирование
    map(owners=> owners.map(owner=>{return owner.aCars})),
    mergeMap(cars=> cars),
    mergeAll(),
    toArray(),
    map(cars=> cars.map(cars_obj=>{return cars_obj.aLicensePlateNumber})
    ),
    map(val=> (val.includes(control.value)) ? {aLicensePlateNumberValidator: true} : null),
    )
  };
}

 aLicensePlateNumberLocalValidator(cid: number): AsyncValidatorFn {
    return (control: AbstractControl):  Observable<ValidationErrors | null> => {
      if (!control.valueChanges) {
          return of(null);
      }else{
      return this.dataStore.carsData$.pipe(
        map(cars => cars.filter(car => car.cid !== cid)),
        map(components=>  components.map(component=> {return component.car_data})),
        map(cars=> cars.map(cars_obj=>{return cars_obj.aLicensePlateNumber})),
        map(car=> (car.includes(control.value)) ? {aLicensePlateNumberLocalValidator: true} : null),
        ).pipe(first())
    }
    }
  }
}
