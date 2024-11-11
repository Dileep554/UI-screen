import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-filter',
  templateUrl: './photo-filter.component.html',
  styleUrls: ['./photo-filter.component.css']
})
export class PhotoFilterComponent implements OnInit {
  albumIds: number[] = [];
  ids: number[] = [];
  titles: string[] = [];
  urls: string[] = [];
  selectedAlbumIds: number[] = [];
  selectedIds: number[] = [];
  selectedTitles: string[] = [];
  selectedUrls: string[] = [];

  @Output() filterCriteria = new EventEmitter<any>();

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.photos$.subscribe(photos => {
      this.albumIds = [...new Set(photos.map(photo => photo.albumId))];
      this.ids = [...new Set(photos.map(photo => photo.id))];
      this.titles = [...new Set(photos.map(photo => photo.title))];
      this.urls = [...new Set(photos.map(photo => photo.url))];
    });
  }

  applyFilter(): void {
    this.emitSelectedCounts();
    this.filterCriteria.emit({
        albumIds: this.selectedAlbumIds || [],
        ids: this.selectedIds || [],
        titles: this.selectedTitles || [],
        urls: this.selectedUrls || []
    });
}

  resetFilter(): void {
    this.selectedAlbumIds = [];
    this.selectedIds = [];
    this.selectedTitles = [];
    this.selectedUrls = [];
    this.emitSelectedCounts();
  }

  emitSelectedCounts(): void {
    this.filterCriteria.emit({
      albumIds: this.selectedAlbumIds,
      ids: this.selectedIds,
      titles: this.selectedTitles,
      urls: this.selectedUrls
    });
  }
}
