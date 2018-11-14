import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  handleError(error) {
    console.warn('Handler caught an error', error);
    alert(error);
  }
}
