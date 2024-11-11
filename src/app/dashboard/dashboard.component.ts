import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  albumIdCount: number = 0;
  idCount: number = 0;
  titleCount: number = 0;
  urlCount: number = 0;
  selectedAlbumIdsCount: number = 0;
  selectedIdsCount: number = 0;
  selectedTitlesCount: number = 0;
  selectedUrlsCount: number = 0;

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.getCounts().subscribe(counts => {
      this.albumIdCount = counts.albumIdCount;
      this.idCount = counts.idCount;
      this.titleCount = counts.titleCount;
      this.urlCount = counts.urlCount;
    });
  }

  updateSelectedCounts(selectedCounts: any): void {
    this.selectedAlbumIdsCount = (selectedCounts.albumIds || []).length;
    this.selectedIdsCount = (selectedCounts.ids || []).length;
    this.selectedTitlesCount = (selectedCounts.titles || []).length;
    this.selectedUrlsCount = (selectedCounts.urls || []).length;
  }
}
