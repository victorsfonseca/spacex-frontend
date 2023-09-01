import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { BarChartData } from "../../models/barChartData.model";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.color = '#AAB3BC'
ChartJS.defaults.borderColor = '#AAB3BC'

export type BarChartProps = {
    data: BarChartData
}

export function BarChart({data}: BarChartProps){
    const tranlatedData = {
        labels: data.years,
        datasets: data.data.map(_ => {
            return {
                label: _.rocket,
                data: _.values,
                backgroundColor: [_.backgroundColor]
            }
        })
    }
    return(
        <Bar 
            data={tranlatedData}
            options={{
                plugins: {
                    title: {display: false},
                    legend: {display: false},
                    datalabels: {display: false}
                },
                scales: {
                    x: {stacked: true},
                    y: {stacked: true}
                },
                responsive: true
            }}
        />
    )
}