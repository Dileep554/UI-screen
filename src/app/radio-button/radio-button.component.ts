import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css'
})
export class RadioButtonComponent {
  selectedOption: string = 'option1'; // Default selection
  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  @Input() filterCriteria: any; 
  @Output() viewChanged = new EventEmitter<string>();
  

  onFilterChange(criteria: any): void {
    this.filterCriteria = criteria;
    this.updateSelectedCounts(criteria);
  }

  updateSelectedCounts(selectedCounts: any): void {
    this.dashboard.updateSelectedCounts(selectedCounts);
  }
  onOptionChange(): void {
    this.viewChanged.emit(this.selectedOption);  // Emit the selected option as a string
  }


 

 
  

}
