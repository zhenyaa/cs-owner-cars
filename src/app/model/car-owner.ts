
export interface CarEntity{
  id: number,
  aManufacturerName: string,
  aModelName: string,
  aProductionYear: Date,
  aLicensePlateNumber: string
  owner_id: number
}

export interface OwnerEntity{
  id: number,
  aLastName: string,
  aFirstName: string,
  aMiddleName: string,
  carsQuant: number,
  aCars: CarEntity[]
}

export class CompType {
  uid: number;
  cid: number;
  car_data: CarEntity;
  status_validete: string;
}
