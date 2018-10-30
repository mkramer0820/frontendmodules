import { FormControl } from "@angular/forms";
import { SetName} from './set-name.model';

export class SetNameForm {
    set_name = new FormControl();
    constructor(
      set_name: SetName,
    ) {
      this.set_name.setValue(set_name.set_name);
    }
  }
