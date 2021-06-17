import { Injectable } from '@angular/core';
// import { Product } from './product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap, mergeMap, tap} from 'rxjs/operators';
import { OwnerEntity, CarEntity} from './model/car-owner'

@Injectable({
  providedIn: 'root'
})
export class ICarOwnersService {
  private carsUrl = 'api/cars/';
  private ownersUrl = 'api/owners/';
  constructor(private http: HttpClient) { }

  getOwners():Observable<OwnerEntity[]>{
    return this.http.get<OwnerEntity[]>(this.ownersUrl)
  };

  getOwnerById(aId: number): Observable<OwnerEntity>{
    return this.http.get<OwnerEntity>(`${this.ownersUrl}${aId}/`)
  }

  createOwner2(aOwner:OwnerEntity):Observable<OwnerEntity>{
    return this.http.post<OwnerEntity>(this.ownersUrl, aOwner)
  }

 createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity>{  // можно передавать и по отдельности но отправил целое методом createOwner2
   return this.http.post<OwnerEntity>(this.ownersUrl, {aLastName:aLastName, aFirstName:aFirstName, aMiddleName:aMiddleName,aCars:aCars})
 }
 editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>{
   let OwnerId = aOwner.id
   return this.http.put<OwnerEntity>(`${this.ownersUrl}${OwnerId}/`, aOwner)
 }
 deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>{ 
   return this.http.delete<number>(this.ownersUrl + aOwnerId + '/').pipe(
     switchMap(res=>{
       return this.getOwners();
     })
     )
 };

}
