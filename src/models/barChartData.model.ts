export interface BarChartRocketData {
    rocket: string;
    values: number[];
    backgroundColor: string;
}

export interface BarChartData {
    years: string[];
    data: BarChartRocketData[];
}