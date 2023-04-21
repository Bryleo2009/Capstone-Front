import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Injectable, Component } from '@angular/core';
import { Inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(public dialog: MatDialog) {}

  openModal(mensaje: string, tipo: string): void {
    const dialogRef = this.dialog.open(ModalMensajeComponent, {
      width: '400px',
      data: { mensaje: mensaje, tipo: tipo },
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}

@Component({
  selector: 'app-modal-error',
  template: `
    <!-- <h1 mat-dialog-title class="modal-title">Dialog with elements</h1>
    <div mat-dialog-content class="modal-body">
      This dialog showcases the title, close, content and actions elements.
    </div>
    <div mat-dialog-actions class="modal-footer">
      <button mat-button mat-dialog-close>Close</button>
    </div> -->

    <div style="padding: 20px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 mat-dialog-title class="modal-title">{{data.tipo}}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close" (click)="onNoClick()"
            ></button>
          </div>
          <div mat-dialog-content class="modal-body">
            <p>{{data.mensaje}}</p>
          </div>
          <div mat-dialog-actions class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal" (click)="onNoClick()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalMensajeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string; tipo: string },
    public dialogRef: MatDialogRef<ModalMensajeComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
