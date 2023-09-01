import { PieChart } from '../../../components/pieChart/pieChart.component'
import { Skeleton } from '../../../components/skeleton/skeleton.component'
import { LaunchSuccessStats } from '../../../models/launchSuccessStats.model'
import { PieChartData } from '../../../models/pieChartData.model'
import './launchesPerRockets.section.css'

type LauchesPerRocketSectionProps = {
    data?: PieChartData[],
    results?: LaunchSuccessStats
}

export function LauchesPerRocketSection({data, results}: LauchesPerRocketSectionProps){
    
    if(!(data && results) ) return <div className='responsive' style={{minHeight: '200px'}}><Skeleton /></div>
    
    return(
        <div id="LaunchesPerRocket" className='flex flex-d-column align-items-center responsive'>
            <h3 className='hide flex-on-desktop'>Lançamentos de foguetes</h3>
            <div id='LaunchesPerRocketContent' className='flex flex-d-row'>
                <div id='LaunchesPerRocketLeftContent' className='flex flex-d-column align-items-center col-sm-12 col-xl-5'>
                    <div id='LaunchesPerRocketLegend' className='hide flex-on-desktop flex-d-column responsive'>
                        {data.map( (_, index) => 
                        <span key={index} className='flex flex-d-row align-items-center'>
                            <span className='LegendSquare' style={{backgroundColor: _.backgroundColor}}/>
                            {_.rocket}
                        </span>
                        )}
                    </div>
                    <div id='LaunchesPerRocketResults' className='flex flex-d-column col-xl-12 col-sm-11 nm'>
                        <h3 className='align-self-center'>Resultado de Lançamento:</h3>
                        <span>Sucesso: <span className='success'>{results.success}</span></span>
                        <span>Falha: <span className='fail'>{results.fails}</span></span>
                    </div>
                </div>
                <div id='LauchesPerRocketPieChart' className='hide flex-on-desktop col-xl-7'>
                    <PieChart data={data} />
                </div>
            </div>
        </div>
    )
}