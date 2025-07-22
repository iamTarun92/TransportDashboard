// Chart data
export interface ChartType {
    labels?: any;
    datasets?: any;
    options?: any;
}

export interface Root {
    status: string
    sosAlert: SosAlert[]
    vehComplianceNotifications: any
    drComplianceNotifications: any
    onTimeArrivalRatio: any
    gender: any
    occupancyUtilization: any
}

export interface SosAlert {
    gpsTS: number
    empID: string
    name: string
    locationName: string
}

export interface OnTimeArrivalRatioRoot {
    onTimeArrivalRatio: OnTimeArrivalRatio;
}

export interface OnTimeArrivalRatio {
    Hyderabad: CityStats;
    Chennai: CityStats;
    Bangalore: CityStats;
    Mysore: CityStats;
    Kerala: CityStats;
    Madurai: CityStats;
}

export interface CityStats {
    OnTime: number;
    Delay: number;
    Total: number;
}

export interface ComplianceInfoRoot {
    vehComplianceNotifications: Record<string, ComplianceInfo>;
}

export interface ComplianceInfo {
    insurance?: string;
    routePermit?: string;
    puc?: string;
}


export interface OccupancyUtilizationRoot {
    occupancyUtilization: OccupancyUtilization
}

export interface OccupancyUtilization {
    Chennai: number
    Bangalore: number
    Hyderabad: number
    Madurai: number
    Kerala: number
    Mysore: number
}

export interface VehComplianceNotifications {
    vehicle: string
    insurance: string
    routePermit: string
    puc: string
    insuranceExpired: string
    routePermitExpired: string
    pucExpired: string
}