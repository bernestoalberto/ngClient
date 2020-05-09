import { Injectable } from '@angular/core';
import { GlobalConstants } from './../shared/global-constants';

@Injectable()

export class GoogleChartsBaseService {
  google = GlobalConstants.google;
  constructor() {
    if(this.google){
    this.google.charts.load('current', {
      packages: ['corechart']
    });
  }
  }

  protected buildChart(data: any[], chartFunc: any, options: any): void {
    const func = (chartFunct, option) => {
      const datatable = this.google.visualization.arrayToDataTable(data);
      chartFunct().draw(datatable, option);
    };
    const callback = () => func(chartFunc, options);
    this.google.charts.setOnLoadCallback(callback);
  }
}
