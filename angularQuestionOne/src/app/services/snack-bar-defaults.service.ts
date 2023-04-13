import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarDefaultsService {
  constructor(private snackBar: MatSnackBar) {}

  public OK_MESSAGE = 'Done with success!';
  public ERROR_MESSAGE = 'Oops! Something wrong happened! Try again later!';
  public ERROR_FORM_MESSAGE = 'Insert all the necessary fields!!';

  public BUTTON_X = '❌';
  public BUTTON_VERIFIED = '✔️';

  public messageWithDefaultDuration(message: string, actionBtn: string) {
    this.snackBar.open(message, actionBtn, { duration: 2500 });
  }

  public messageDefaultOK() {
    this.messageWithDefaultDuration(this.OK_MESSAGE, this.BUTTON_VERIFIED);
  }

  public messageDefaultError() {
    this.messageWithDefaultDuration(this.ERROR_MESSAGE, this.BUTTON_X);
  }

  public messageDefaultFormError() {
    this.messageWithDefaultDuration(this.ERROR_FORM_MESSAGE, this.BUTTON_X);
  }
}
