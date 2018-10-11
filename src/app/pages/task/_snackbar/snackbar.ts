import {  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material';

export class SuccessSnackBar {

    setAutoHide: boolean = true;
    autoHide: number = 2000;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    action: boolean = true;


    message: string;

    constructor(
        public snackBar: MatSnackBar,
      ) {}
    
    openSnackBar(message) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        this.snackBar.open(message, this.action ?,  config);
    }
    
    
}