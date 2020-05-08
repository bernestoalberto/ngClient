export class PieChartConfig {
  title: string;
  pieHole: number;

  constructor(title: string, pieHole: number) {
      this.title = title;
      this.pieHole = pieHole;
  }
}
export interface PieChart {
  data: any;
  elementId: string;
  config: PieChartConfig;
}
