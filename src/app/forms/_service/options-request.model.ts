
export class RootOption {
    Field: string;
    description: string;
    renders: string[];
    parses: string[];
    actions: OptionActions;

}
  export class OptionActions {
    POST: OptionPost;
}
export class OptionPost {
    id: Id;
    contacts: Id;
    contact_Field: ForeignKeyField;
    address1: Field;
    address2: Field;
    address3: Field;
    city: Field;
    state: Field;
    zip: Field;
    country: Field;
    email: Field;
    phone: Field;
    website: Field;
    description: Id;
    isActive: Id;
}
export class Field {
    type: string;
    required: boolean;
    read_only: boolean;
    label: string;
    max_length: number;
}
  export class ForeignKeyField {
    type: string;
    required: boolean;
    read_only: boolean;
    label: string;
    choices: Choice[];
}
export class Choice {
    key: number;
    value: string;
}
export class Id {
    type: string;
    required: boolean;
    read_only: boolean;
    label: string;
}
