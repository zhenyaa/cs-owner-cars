import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemCarsOwnerService implements InMemoryDbService {

   createDb() {
     return {
      owners : [
       { id: 1, aLastName: 'kleshov', aFirstName: 'zhenya', aMiddleName: 'Vacilevich', aCars: [{aManufacturerName: 'ZAZ', aModelName: 'ZAPOROZHEC', aProductionYear: 2001, aLicensePlateNumber: 'AX8597YZ'},
       {aManufacturerName: 'ZAZ', aModelName: 'ZAPOROZHEC', aProductionYear: 2001, aLicensePlateNumber: 'AX8597YY'}]},
     
      ]
     }
   }
   
}
