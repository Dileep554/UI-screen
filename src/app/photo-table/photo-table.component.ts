import { Component, OnInit, AfterViewInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { PhotoService } from '../photo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-photo-table',
  templateUrl: './photo-table.component.html',
  styleUrls: ['./photo-table.component.css'],
})
export class PhotoTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'albumId', 'id', 'title', 'url', 'thumbnailUrl'];
  displayedColumnsWithLabels: string[] = ['select', 'albumId', 'id', 'title', 'url', 'thumbnailUrl'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  originalData: any[] = [];
  isLoading = true;
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private photoService: PhotoService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchPhotos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Ensure paginator is set after view initializes
  }

  fetchPhotos(): void {
    this.photoService.fetchPhotos().subscribe({
      next: (data) => {
        this.originalData = data;
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching photos:', err);
        this.isLoading = false;
        this.errorMessage = 'Failed to load data. Please try again later.';
      }
    });
  }

  @Input() set filterCriteria(criteria: any) {
    if (criteria) {
      this.applyFilter(criteria);
    }
  }

  applyFilter(criteria: any): void {
    if (Object.keys(criteria).length === 0) {
      this.resetToOriginalData();
    } else {
      this.dataSource.data = this.originalData.filter(photo =>
        (!criteria.albumIds.length || criteria.albumIds.includes(photo.albumId)) &&
        (!criteria.ids.length || criteria.ids.includes(photo.id)) &&
        (!criteria.titles.length || criteria.titles.some((title: any) => photo.title.includes(title))) &&
        (!criteria.urls.length || criteria.urls.some((url: any) => photo.url.includes(url)))
      );
    }

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  resetToOriginalData(): void {
    this.dataSource.data = this.originalData;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  applyColumnFilter(column: string, value: string) {
    if (value.trim() === '') {
      this.dataSource.filter = '';
      this.dataSource.data = this.originalData;
    } else {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const dataValue = data[column];
        const dataStr = typeof dataValue === 'string' ? dataValue.toLowerCase() : String(dataValue);
        return dataStr.startsWith(filter.toLowerCase());
      };
      this.dataSource.filter = value.trim().toLowerCase();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isIndeterminate() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected > 0 && numSelected < numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    const selectedRows = this.selection.selected;
    if (selectedRows.length === 1) {
      console.log("Single row selected:", selectedRows[0]);
    } else {
      console.log("Current selection:", selectedRows);
    }
  }

  onFilterChange(criteria: any): void {
    this.applyFilter(criteria);
    this.updateSelectedCounts(criteria);
  }

  updateSelectedCounts(selectedCounts: any): void {
    if (this.dashboard) { // Ensure dashboard is available
      this.dashboard.updateSelectedCounts(selectedCounts);
    }
  }
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle confirmation (e.g., send audit request)
        console.log("Audit request confirmed.");
      }
    });
  }
}
