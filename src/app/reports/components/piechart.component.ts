import { Component, Input, OnInit } from '@angular/core';

import { GooglePieChartService } from './../google-pie-chart.service';
import { PieChartConfig } from './../PieChartConfig';
import { GlobalConstants } from './../../shared/global-constants';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;
  public google = GlobalConstants.google;
  constructor(private pieChartService: GooglePieChartService) { }

  ngOnInit(): void {
    this.pieChartService.BuildPieChart(this.elementId, this.data, this.config);

  }
}
