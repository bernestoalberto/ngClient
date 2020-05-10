import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageSearchComponent } from './package-search.component';
import { PackageSearchService } from './package-search.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule} from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [PackageSearchComponent],
  exports : [PackageSearchComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [PackageSearchService]
})
export class PackageSearchModule { }
