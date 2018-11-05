export class Customer {
  constructor(
    public isActive: boolean,
    public id: number,
    public name: string,
    public address1: string,
    public address2: string,
    public address3: string,
    public city: string,
    public state: string,
    public zipcode: string,
    public country: string,
    public email: string,
    public phone: string,
    public extension: string,
    public website: string,
    public description: string) {
  }
}

export class DialogCustomerModel {
     id: number;
     name: string;
     address1: string;
     address2: string;
     address3: string;
     country: string;
     state: string;
     zip: string;
     email: string;
     phone: string;
     website: string;
     description: string;
}
