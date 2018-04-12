import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service.service';
import { Constants } from '../constants';
import { Location } from '@angular/common';
import { MatTableDataSource, MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhotoOverviewComponent } from '../photo-overview/photo-overview.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private location: Location,
    public dialog: MatDialog
  ) { }
  albumList = [];
  photoList = [];
  isDisabled = true;
  selectedAlbumsHash = {};
  dataSource = null;
  displayedColumns = ['id', 'title'];
  selectedAlbums = [];
  ngOnInit(): void {
    this.getAlbumDetails();
  }

  getAlbumDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.httpService.get(Constants.ALBUM_URL).subscribe(
      data => {
        this.albumList = data.filter(
          (album) =>
            album.userId === id
        );
        this.dataSource = new MatTableDataSource(this.albumList);
      }
    );
  }
  showPhotos() {
    const first = 0;
    const second = 1;
    let firstAlbumPhotoList;
    let secondAlbumPhotoList;
    this.httpService.get(Constants.PHOTO_URL).subscribe(
      data => {
        this.selectedAlbums.forEach((album, index) => {

          if (index === first) {
            firstAlbumPhotoList = data.filter((photo) => photo.albumId === album.id);
          }
          if (index === second) {
            secondAlbumPhotoList = data.filter((photo) => photo.albumId === album.id);
          }

        });
        this.openDialog(firstAlbumPhotoList, secondAlbumPhotoList);
      }
    );

  }
  openDialog(firstAlbumPhotoList = [], secondAlbumPhotoList = []): void {
    const dialogRef = this.dialog.open(PhotoOverviewComponent, {
      width: '450px',
      height: '400px',
      data: { firstAlbumPhotoList: firstAlbumPhotoList, secondAlbumPhotoList: secondAlbumPhotoList }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  goBack(): void {
    this.location.back();
  }
  selection(row, $event) {
    const maxLimit = 2;
    const zero = 0;
    const one = 1;
    if ($event.checked) {
      if (this.selectedAlbums.length < 3) {
        this.selectedAlbums.push(row);
      }
      if (this.selectedAlbums.length <= maxLimit) {
        this.isDisabled = false;
        this.selectedAlbumsHash[row.id] = true;
      }
    } else {
      this.selectedAlbumsHash[row.id] = false;
      let albumLength = this.selectedAlbums.length;
      for (let index = zero; index < albumLength; index++) {
        if (this.selectedAlbums[index].id === row.id) {
          albumLength = zero;
          this.selectedAlbums.splice(index, one);
        }
      }
      if (this.selectedAlbums.length === zero) {
        this.isDisabled = true;
      }
    }
  }
}


