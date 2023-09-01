import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";

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
import { PieChartData } from '../../models/pieChartData.model';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export type PieChartProps = {
    data: PieChartData[]
}

export function PieChart({data}: PieChartProps){
    
    const translatedData = {
        labels: data.map(_ => _.rocket),
        datasets: [
            {
                // label: pieData.map(_ => _.rocket),
                data: data.map(_ => _.value),
                backgroundColor: data.map(_ => _.backgroundColor),
            }
        ]
    }

    return(
        <Pie 
        data={translatedData} 
        options={
            {
                elements:{
                    arc:{
                        borderWidth: 0
                    }
                },
                plugins:{
                    datalabels: {
                        display: true,
                        color: (context) => data[context.dataIndex].color,
                        font: {
                            weight: 'bold',
                            size: 16,
                        }
                    },
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false,
                    }
                },
                responsive: true,
            }
        } />
    )
}