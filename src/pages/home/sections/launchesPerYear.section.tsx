import { BarChart } from '../../../components/barChart/barChart.component'
import { Skeleton } from '../../../components/skeleton/skeleton.component'
import { BarChartData } from '../../../models/barChartData.model'
import './launchesPerYear.section.css'

type LaunchesPerYearSectionProps = {
    data?: BarChartData
}

export function LaunchesPerYearSection({data}: LaunchesPerYearSectionProps){
    if(!data) return <div className='responsive' style={{height: '200px'}}><Skeleton /></div>
    return(
        <div id='LaunchesPerYear' className='flex flex-d-column align-items-center responsive'>
            <h3 className='hide flex-on-desktop'>Lançamentos por ano</h3>
            <BarChart data={data}/>
        </div>
    )
}