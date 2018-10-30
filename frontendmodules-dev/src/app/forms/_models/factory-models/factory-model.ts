
export class NewFactory {
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
  createdOn: string;
  isActive: boolean;
  slug: string;
  contact_name: Contactname;

}

export class Contactname {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  choices: Choice[];
}

export class Choice {
  value: number;
  display_name: string;
}

