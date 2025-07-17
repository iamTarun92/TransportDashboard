import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Chart, registerables } from 'chart.js';
import { cancelledTripsChart, genderShiftChart, ontimeChart, scheduledTripsChart, tripTrendChart, vendorTripsChart } from './chartData';
import { ChartType, SosAlert } from './data.model';
Chart.register(...registerables);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'TransportDashboard';
  fromDate: string = '';
  toDate: string = '';
  selectedLocation: string = 'All';
  sosAlertsData: SosAlert[] = [];
  occupancyChartData!: ChartType

  constructor(private dataService: ApiService) { }

  ngAfterViewInit() {
    this.renderChart('ontime', 'radar', ontimeChart);
    this.renderChart('tripTrend', 'line', tripTrendChart);
    this.renderChart('scheduledTrips', 'bar', scheduledTripsChart);
    this.renderChart('cancelledTrips', 'bar', cancelledTripsChart);
    this.renderChart('vendorTrips', 'doughnut', vendorTripsChart);
    this.renderChart('genderShift', 'bar', genderShiftChart);
  }

  ngOnInit() {
    this.dataService.getChartData().subscribe((data) => {
      this.sosAlertsData = data.sosAlert;

      this.occupancyChartData = {
        labels: Object.keys(data.occupancyUtilization),
        datasets: [{
          data: Object.values(data.occupancyUtilization),
        }]
      };

      // Render the occupancy chart after data is set
      this.renderChart('occupancy', 'polarArea', this.occupancyChartData);
    });
  }


  renderChart(element: string, chartType: any, data: any) {
    new Chart(element, {
      type: chartType,
      data: {
        labels: data?.labels,
        datasets: data?.datasets
      },
      options: data?.options
    });
  }
}
