// import { Component, ViewEncapsulation } from '@angular/core';
// import { ICellRendererAngularComp } from '@ag-grid-community/angular';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { EditServicesComponent } from '../../mng-services/edit-services/edit-services.component';
// import { DeleteServiceComponent } from '../../mng-services/delete-service/delete-service.component';


/*@Component({
  selector: 'app-action-cell',
  template: `
<tr>
<td><a mat-button href="javascript: void(0)" data-orderid="" title="Edit Media">
  <mat-icon>mode_edit</mat-icon>
  </a></td>
  <td><a mat-button href="javascript: void(0)" data-orderid="" title="Delete Media">
  <mat-icon>delete</mat-icon>
</a></td>
</tr>`,
  styles: [``]
})*/
/*export class ActionRendererComponent implements ICellRendererAngularComp {
  public params: any;
  public dialogRef: MatDialogRef<any>;
  agInit(params: any): void {
    this.params = params;
  }
  constructor(public dialog: MatDialog) { }

  openDialog(numDialog = 1, payload = {}): void {
    if (numDialog === 2) {
      this.dialogRef = this.dialog.open(EditServicesComponent, {
        width: '850px',
        height: '850px',
        data: payload

      });
    } else if (numDialog === 3) {
      this.dialogRef = this.dialog.open(DeleteServiceComponent, {
        width: '550px',
        height: '150px',
        data: payload
      });
    }

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  refresh(): boolean {
    return false;
  }
}
*/
