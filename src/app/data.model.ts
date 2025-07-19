// Chart data
export interface ChartType {
    labels?: any;
    datasets?: any;
    options?: any;
}

export interface SosAlert {
    gpsTS: number
    empID: string
    name: string
    locationName: string
}