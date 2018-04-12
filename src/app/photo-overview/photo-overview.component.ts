import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatGridListModule } from '@angular/material';

@Component({
  selector: 'app-photo-overview',
  templateUrl: './photo-overview.component.html',
  styleUrls: ['./photo-overview.component.css']
})
export class PhotoOverviewComponent {
  count = 2;
  isFirstPhotoAlbum = false;
  isSecondPhotoAlbum = false;
  constructor(
    public dialogRef: MatDialogRef<PhotoOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loadPhotoList();
  }
  loadPhotoList() {
    console.log(this.data);
    if (this.data.firstAlbumPhotoList.length && this.data.secondAlbumPhotoList.length) {
      this.isFirstPhotoAlbum = true;
      setInterval(() => { this.toggle(); }, 20000);
    } else if (this.data.firstAlbumPhotoList.length) {
      this.isFirstPhotoAlbum = true;
    } else if (this.data.secondAlbumPhotoList.length) {
      this.isSecondPhotoAlbum = true;
    } else { }
    console.log(this.data);
  }
  toggle() {
    if (this.count % 2 === 0) {
      this.isFirstPhotoAlbum = true;
      this.isSecondPhotoAlbum = false;

    } else {
      this.isFirstPhotoAlbum = false;
      this.isSecondPhotoAlbum = true;
    }
    this.count++;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
