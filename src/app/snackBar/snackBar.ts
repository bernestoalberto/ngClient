import { MatSnackBar } from '@angular/material';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  constructor( private snackBar: MatSnackBar) {}
}
