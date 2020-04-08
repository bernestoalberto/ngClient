import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditServicesComponent, } from '../mng-services/edit-services/edit-services.component';
import { DeleteServiceComponent } from '../mng-services/delete-service/delete-service.component';


@Component({
  selector: 'app-child-cell',
  template: `<span><a mat-button href="javascript: void(0)" (click)="openDialog(2);dialogType = 'editService'"
    data-orderid="" title="Edit Service">
    <mat-icon>mode_edit</mat-icon>
  </a></span>
  <span><a mat-button href="javascript: void(0)"
            (click)="openDialog(3);dialogType = 'deleteService'" data-orderid="" title="Delete Service">
            <mat-icon>delete</mat-icon>
          </a></span>
  `,
  styles: [
    `.btn {
            line-height: 0.5
        }`
  ]
})

export class ChildMessageRendererComponent implements ICellRendererAngularComp {
  public params: any;
  public dialogRef: MatDialogRef<any>;
  agInit(params: any): void {
    this.params = params;
  }
  constructor(private dialog: MatDialog) {}
  public openDialog(numDialog = 2, payload = {}) {

    if (numDialog === 2) {
      this.dialogRef = this.dialog.open(EditServicesComponent, {
        width: '850px',
        height: '850px',
        data: this.params.data

      });
    } else if (numDialog === 3) {
      this.dialogRef = this.dialog.open(DeleteServiceComponent, {
        width: '550px',
        height: '150px',
        data: this.params.data.id
      });
   // Create the EDit and Delete Media with dialogRef
    } /*else if (numDialog === 4) {
      this.dialogRef = this.dialog.open(EditMediaComponent, {
        width: '850px',
        height: '850px',
        data: this.params.data.id
      });
    } else if (numDialog === 5) {
      this.dialogRef = this.dialog.open(DeleteMediaComponent, {
        width: '550px',
        height: '150px',
        data: this.params.data.id
      });

    }*/
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
   // this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`);
  }

  refresh(): boolean {
    return false;
  }
}
