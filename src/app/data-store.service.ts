import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { OwnerEntity, CarEntity, CompType } from './model/car-owner';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() { }

  carsData = new BehaviorSubject<{cid:number,car_data:CarEntity,status_validete:string, status_LicensePlateNumber: boolean;}[]>([])
  carsData$ = this.carsData.asObservable()

  statusComponentsValidate = new BehaviorSubject<boolean>(false)
  statusComponentsValidate$ = this.statusComponentsValidate.asObservable()  

  public addCarsData(carData){
    let temp = this.carsData.getValue()
    if(temp.includes(carData)){
      let ind = temp.indexOf(carData)
      temp[ind] = carData
      this.carsData.next(temp)
      this.isValidCarData()
    }
    else{
      this.carsData.next(this.carsData.getValue().concat([carData]))
    }
  }

  public deleteCarData(car_data){
    let temp = this.carsData.getValue()
    temp = temp.filter((value, index)=> value.cid !== car_data.index)
    this.carsData.next(temp)
  }

  public createComponent(comp_data, uid){
    const last_item = this.carsData.getValue().slice(-1)[0]
    let newCarComp = new CompType()
    newCarComp.status_validete = 'INVALID';
    if (comp_data != 0){
      newCarComp.car_data = comp_data
    }

    if (typeof (last_item) == 'undefined') { 
         newCarComp.cid = 1
    }
    else{
      newCarComp.cid = last_item.cid + 1
    }
    newCarComp.uid = uid
    this.addCarsData(newCarComp);
    this.isValidCarData();
  }

  isValidCarData(){
    let components = this.carsData.getValue()
    if (typeof components !== 'undefined' && components.length < 1){
      this.statusComponentsValidate.next(false);
      return false;
    }
    components.forEach(carComp=>{
      if(carComp.status_validete == "INVALID"){
        this.statusComponentsValidate.next(false);
        return false
      }else{
         this.statusComponentsValidate.next(true);
         return false
      }
    })
  }
}
