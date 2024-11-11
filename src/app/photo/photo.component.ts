import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements AfterViewInit {
  filterCriteria: any = {};
  currentView: string = 'option1';

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  ngAfterViewInit(): void {
    this.updateSelectedCounts({
      albumIds: this.filterCriteria.albumIds || [],
      ids: this.filterCriteria.ids || [],
      titles: this.filterCriteria.titles || [],
      urls: this.filterCriteria.urls || []
    });
    setTimeout(() => {
      this.resetPaginationAndData();
    });
  }

  onFilterChange(criteria: any): void {
    this.filterCriteria = criteria;
    this.updateSelectedCounts(criteria);  // Update the counts
}
onViewChange(view: string): void {
  this.currentView = view;
  if (view === 'option1') {
    this.resetPaginationAndData();
  } else {
    this.clearFilterCriteria();
  }
}
resetPaginationAndData(): void {
  this.filterCriteria = {};  // Reset filter criteria
  if (this.paginator) {
    this.paginator.firstPage(); // Reset pagination
  } 
}
clearFilterCriteria(): void {
  this.filterCriteria = {};  // Clear filter criteria when switching to option 2
}

  updateSelectedCounts(selectedCounts: any): void {
    if (this.dashboard) {
      this.dashboard.updateSelectedCounts({
        albumIds: selectedCounts.albumIds || [],
        ids: selectedCounts.ids || [],
        titles: selectedCounts.titles || [],
        urls: selectedCounts.urls || []
      });
    }
  }

}
