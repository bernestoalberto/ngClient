import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {
  MatAutocompleteModule} from '@angular/material/autocomplete';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import {
  MatChipsModule,
  } from '@angular/material/chips';
  import {
  MatDatepickerModule,
  } from '@angular/material/datepicker';
  import {
  MatExpansionModule,
  } from '@angular/material/expansion';
  import {
  MatPaginatorModule,
  } from '@angular/material/paginator';
  import {
  MatRadioModule
  } from '@angular/material/radio'
  import {
  MatSliderModule
  } from '@angular/material/slider';
  import {
  MatSlideToggleModule
  } from '@angular/material/slide-toggle';
  import { MatSnackBarModule } from '@angular/material/snack-bar';
  import {
  MatSortModule}
  from '@angular/material/sort';
  import {
  MatTabsModule} from  '@angular/material/tabs';
  import {
  MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatLabel,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatBadgeModule
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatBadgeModule
  ],
  providers: [
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule
  ]

})
export class MaterialModule { }
