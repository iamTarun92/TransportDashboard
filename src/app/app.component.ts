import { Component, OnInit } from '@angular/core';
import { cancelledTripsChart, genderShiftChart, occupancyChart, ontimeChart, scheduledTripsChart, tripTrendChart, vendorTripsChart } from './chartData';
import { ChartType, OccupancyUtilization, OnTimeArrivalRatio, Root, SosAlert, VehComplianceNotifications } from './data.model';
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
  vehComplianceNotificationsData: VehComplianceNotifications[] = [];
  locationList: string[] = [];

  // Chart data properties
  ontimeChartData!: ChartType
  occupancyChartData!: ChartType
  tripTrendChartData!: ChartType
  scheduledTripsChartData!: ChartType
  cancelledTripsChartData!: ChartType
  vendorTripsChartData!: ChartType
  genderShiftChartData!: ChartType
  rowJsonData: Root | undefined

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this._fetchData();
    this.loadData()
  }

  loadData() {
    this.dataService.getData().subscribe((data: Root) => {
      this.rowJsonData = data;
      this.sosAlertsData = data.sosAlert;
      this.locationList = this._setLocationList(data.onTimeArrivalRatio);
      this.vehComplianceNotificationsData = this._setVehCompliance(data.vehComplianceNotifications);
      this._setOntimeChartData(data.onTimeArrivalRatio);
      this._setOccupancyChartData(data.occupancyUtilization);
    });
  }

  private _fetchData() {
    this.tripTrendChartData = tripTrendChart;
    this.scheduledTripsChartData = scheduledTripsChart;
    this.cancelledTripsChartData = cancelledTripsChart;
    this.vendorTripsChartData = vendorTripsChart;
    this.genderShiftChartData = genderShiftChart;
  }

  private _checkExpiry(dateStr: string | undefined): boolean {
    const today = new Date();
    if (!dateStr) return false;
    const d = new Date(dateStr.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
    return d < today;
  }

  private _setLocationList(data: OnTimeArrivalRatio): string[] {
    return this.locationList = Object.keys(data);
  }

  private _setVehCompliance(data: any): VehComplianceNotifications[] {
    return Object.entries(data).map(([vehNum, compliance]: any) => {
      return {
        vehicle: vehNum,
        insurance: compliance.insurance || '-',
        routePermit: compliance.routePermit || '-',
        puc: compliance.puc || '-',
        insuranceExpired: this._checkExpiry(compliance.insurance) ? 'expired' : 'valid',
        routePermitExpired: this._checkExpiry(compliance.routePermit) ? 'expired' : 'valid',
        pucExpired: this._checkExpiry(compliance.puc) ? 'expired' : 'valid',
      };
    });
  }

  private _setOntimeChartData(data: OnTimeArrivalRatio): void {
    const branches = Object.keys(data) as (keyof OnTimeArrivalRatio)[];
    const onTimePercentages = branches.map(branch => {
      const currentData = data[branch];
      return ((currentData.OnTime / currentData.Total) * 100).toFixed(2);
    });

    this.ontimeChartData = {
      labels: branches,
      datasets: [{
        label: 'On Time Arrival Ratio',
        data: onTimePercentages,
        backgroundColor: '#2ecc71'
      }]
    };
  }

  private _setOccupancyChartData(data: OccupancyUtilization): void {
    this.occupancyChartData = {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
      }]
    };
  }

  private _filterByDateRange(from: string, to: string): void {
    const start = new Date(from);
    const end = new Date(to);

    this.sosAlertsData = (this.rowJsonData?.sosAlert ?? []).filter((entry: any) =>
      entry.gpsTS >= new Date(this.fromDate).getTime() && entry.gpsTS <= new Date(this.toDate).getTime()
    );

    this._setVehCompliance(this.rowJsonData?.vehComplianceNotifications || {});
    this.vehComplianceNotificationsData = this._setVehCompliance(this.rowJsonData?.vehComplianceNotifications ?? []).filter((vehicle: any) => {
      const insuranceDate = this._convertToISO(vehicle.insurance);
      const routePermitDate = this._convertToISO(vehicle.routePermit);
      const pucDate = this._convertToISO(vehicle.puc);

      return (
        (insuranceDate && insuranceDate >= start && insuranceDate <= end) ||
        (routePermitDate && routePermitDate >= start && routePermitDate <= end) ||
        (pucDate && pucDate >= start && pucDate <= end)
      );
    });
  }

  private _convertToISO(dateStr: string): Date | null {
    if (!dateStr || dateStr.trim() === '-' || !dateStr.includes('-')) return null;
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  }

  applyFilters() {
    this._filterByDateRange(this.fromDate, this.toDate);
  }

  clearFilters() {
    this.fromDate = '';
    this.toDate = '';
    this.selectedLocation = 'All';
    this.loadData();
  }
}
