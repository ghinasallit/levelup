import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './errordialog.component';

@Injectable()
export class ErrorDialogService {

    constructor(public dialog: MatDialog) { }
    openDialog(data: any): void {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
