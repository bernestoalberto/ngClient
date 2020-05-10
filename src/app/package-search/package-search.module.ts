import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageSearchComponent } from './package-search.component';
import { PackageSearchService } from './package-search.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule} from '@angular/platform-browser';
@NgModule({
  declarations: [PackageSearchComponent],
  exports : [PackageSearchComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [PackageSearchService]
})
export class PackageSearchModule { }
