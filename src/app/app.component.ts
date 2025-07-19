import { Component, OnInit } from '@angular/core';
import { cancelledTripsChart, genderShiftChart, occupancyChart, ontimeChart, scheduledTripsChart, tripTrendChart, vendorTripsChart } from './chartData';
import { ChartType, SosAlert } from './data.model';
import { DataService } from './services/data.service';
// Chart.register(...registerables);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TransportDashboard';
  fromDate: string = '';
  toDate: string = '';
  selectedLocation: string = 'All';
  sosAlertsData: SosAlert[] = [];
  vehCompliance: any[] = [];
  locationList: string[] = [];



  // Chart data properties
  ontimeChartData!: ChartType
  occupancyChartData!: ChartType
  tripTrendChartData!: ChartType
  scheduledTripsChartData!: ChartType
  cancelledTripsChartData!: ChartType
  vendorTripsChartData!: ChartType
  genderShiftChartData!: ChartType

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this._fetchData();
    this.loadData()
  }

  loadData() {
    this.dataService.getData().subscribe((data) => {
      this.sosAlertsData = data.sosAlert;
      // Extract location keys from onTimeArrivalRatio
      this.locationList = Object.keys(data.onTimeArrivalRatio);
      this.occupancyChartData = {
        labels: Object.keys(data.occupancyUtilization),
        datasets: [{
          data: Object.values(data.occupancyUtilization),
        }]
      };
      // Convert vehComplianceNotifications object to array
      this.vehCompliance = Object.entries(data.vehComplianceNotifications).map(([vehNum, compliance]: any) => {
        return {
          vehicle: vehNum,
          insurance: compliance.insurance || '-',
          routePermit: compliance.routePermit || '-',
          puc: compliance.puc || '-',
          insuranceExpired: this.checkExpiry(compliance.insurance),
          routePermitExpired: this.checkExpiry(compliance.routePermit),
          pucExpired: this.checkExpiry(compliance.puc),
        };
      });
    });
  }

  private _fetchData() {
    this.ontimeChartData = ontimeChart;
    this.occupancyChartData = occupancyChart
    this.tripTrendChartData = tripTrendChart;
    this.scheduledTripsChartData = scheduledTripsChart;
    this.cancelledTripsChartData = cancelledTripsChart;
    this.vendorTripsChartData = vendorTripsChart;
    this.genderShiftChartData = genderShiftChart;
  }

  private checkExpiry(dateStr: string | undefined): boolean {
    const today = new Date();
    if (!dateStr) return false;
    const d = new Date(dateStr.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
    return d < today;
  }

  onFilterChange(fromDate: string, toDate: string, location: string): void {
    console.log(`Filter changed: From ${fromDate}, To ${toDate}, Location ${location}`);
  }
}
