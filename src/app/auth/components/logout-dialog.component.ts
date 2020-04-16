import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../_services/auth.service';
import { Logout } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import * as fromService from '../../mng-services/reducers/service.reducer';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {
constructor(private store: Store<fromService.AppState>,
            public authService: AuthService,
            public dialogRef: MatDialogRef<LogoutDialogComponent>) { }

  public logout() {
    this.store.dispatch(new Logout());
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }
}
