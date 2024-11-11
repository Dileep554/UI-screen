import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { PhotoFilterComponent } from './photo-filter/photo-filter.component';
import { PhotoTableComponent } from './photo-table/photo-table.component';
import { PhotoService } from './photo.service';
import { PhotoComponent } from './photo/photo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatRadioModule } from '@angular/material/radio';
import { EmailComponent } from './email/email.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoFilterComponent,
    PhotoTableComponent,
    PhotoComponent,
    DashboardComponent,
    EmailComponent,
    RadioButtonComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatIconModule
  ],
  providers: [
    PhotoService,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
