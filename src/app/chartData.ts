import { ChartType } from "./data.model";

const branches = ['AMBIT', 'GOP', 'MEPZ', 'Sohini', 'Apple', 'Google', 'ITPL', 'BhagMane'];

const ontimeChart: ChartType = {
    labels: branches,
    datasets: [{
        label: 'On-Time %',
        data: [88, 85, 92, 80, 78, 86, 89, 91],
        backgroundColor: 'rgba(46, 204, 113, 0.4)',
        borderColor: '#27ae60'
    }],
    options: {
        plugins: { legend: { position: 'bottom' } }
    }
};

const occupancyChart: ChartType = {
    labels: ['<25%', '25–50%', '50–75%', '>75%'],
    datasets: [{
        data: [5, 15, 30, 45],
        backgroundColor: ['#e74c3c', '#f39c12', '#3498db', '#2ecc71']
    }]
};

const tripTrendChart: ChartType = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
        label: 'Total Trips',
        data: [280, 320, 310, 300, 295, 270],
        borderColor: '#8e44ad',
        backgroundColor: 'rgba(142, 68, 173, 0.2)',
        fill: true,
        tension: 0.3
    }],
    options: {
        plugins: { legend: { position: 'top' } }
    }
};

const scheduledTripsChart: ChartType = {
    labels: branches,
    datasets: [{
        label: 'Scheduled Trips',
        data: [100, 120, 90, 110, 80, 75, 130, 140],
        backgroundColor: '#2980b9'
    }]
};

const cancelledTripsChart: ChartType = {
    labels: branches,
    datasets: [{
        label: 'Cancelled Trips',
        data: [5, 10, 7, 8, 4, 6, 3, 5],
        backgroundColor: '#e74c3c'
    }]
};
const vendorTripsChart: ChartType = {
    labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'],
    datasets: [{
        label: 'Trips',
        data: [200, 150, 100, 75, 65],
        backgroundColor: ['#16a085', '#8e44ad', '#e67e22', '#2c3e50', '#c0392b']
    }]
};
const genderShiftChart: ChartType = {
    labels: ['Day Shift', 'Night Shift'],
    datasets: [
        {
            label: 'Male',
            data: [150, 70],
            backgroundColor: '#3498db'
        },
        {
            label: 'Female',
            data: [90, 40],
            backgroundColor: '#e91e63'
        }
    ],
    options: {
        indexAxis: 'y',
        plugins: {
            legend: { position: 'bottom' }
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true }
        }
    }
};


export { ontimeChart, occupancyChart, tripTrendChart, scheduledTripsChart, cancelledTripsChart, vendorTripsChart, genderShiftChart };
