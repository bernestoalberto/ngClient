import { Component, OnInit, Input } from '@angular/core';
import { PackageSearchService } from './package-search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-package-search',
  templateUrl: './package-search.component.html',
  styleUrls: ['./package-search.component.css'],
  providers: [PackageSearchService]
})

export class PackageSearchComponent implements OnInit {
 results:string;
 searchTerm$ =  new Subject<string>();
  @Input() advanceSearch: any;
  public hide;

 constructor(private searchService: PackageSearchService) {
   this.searchService.search(this.searchTerm$).
   subscribe(results => {
   this.results = results;
   });
  }

  ngOnInit() {
  }

}
