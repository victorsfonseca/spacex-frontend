import { useEffect, useState } from 'react';
import './home.page.css';
import { RocketIcon } from '../../assets/icons/rocket.icon';
import { SearchIcon } from '../../assets/icons/search.icon';
import { LauchesPerRocketSection } from './sections/launchesPerRockets.section';
import { PieChartData } from '../../models/pieChartData.model';
import { LaunchesPerYearSection } from './sections/launchesPerYear.section';
import { Table } from '../../components/table/table.component';
import { Launch } from '../../models/launch.model';
import { HomeService } from './home.service';
import { BarChartData, BarChartRocketData } from '../../models/barChartData.model';
import { LaunchSuccessStats } from '../../models/launchSuccessStats.model';
import { ChartColor } from '../../models/chartColor.model';
import { debounce } from '../../utils/debounce';
import { updateURL } from '../../utils/updateURL';

function HomePage() {
    const queryParameters = new URLSearchParams(window.location.search)
    const searchQueryParam = queryParameters.get("search")
    const pageQueryParam = queryParameters.get("page")
    const initialPage = !isNaN(parseInt(pageQueryParam ?? '1', 10)) ? parseInt(pageQueryParam ?? '1', 10) : 1
    const [search, setSearch] = useState<string>(searchQueryParam ?? '')
    const [page, setPage] = useState<number>(initialPage ?? 1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [successResults, setSuccessResults] = useState<LaunchSuccessStats | undefined>(undefined)
    const [pieChartData, setPieChartData] = useState<PieChartData[] | undefined>(undefined)
    const [barChartData, setBarChartData] = useState<BarChartData | undefined>(undefined)
    const [launches, setLaunches] = useState<Launch[] | undefined>(undefined)

    useEffect(()=>{
        SearchStats()
    }, [])

    useEffect(()=>{
        updateURL(search, page)
        SearchLaunches(page)
    }, [page])

    useEffect(()=>{
        updateURL(search, page)

        const isMobileQuery = window.matchMedia('(max-width: 720px)').matches;
        if (isMobileQuery) return debounce(SearchLaunches, 1000)

    }, [search])

    async function SearchLaunches(page: number = 1){
        setLaunches(undefined)
        try {
            let launchesResult = await HomeService().searchLaunches(search,page)
            if(!launchesResult) throw new Error('')
            setTotalPages(launchesResult.totalPages)
            setLaunches(launchesResult.results)
            setPage(page)
        } catch (error) {
            alert("Erro ao buscar launches")
        }
    }

    function SearchButtonPressed(){
        SearchLaunches()
    }

    async function SearchStats(){
        try {
            let stats = await HomeService().searchStats()
            let successData = stats.successResult
            let pieData: PieChartData[] = stats.statsPerRocket.map<PieChartData>(_ => {
                return {
                    rocket: _.rocket, 
                    value: _.value, 
                    color: getColor(_.rocket).color,
                    backgroundColor: getColor(_.rocket).backgroundColor 
                }
            })
            let barData: BarChartData = {
                years: stats.statsPerYear.years.map(_ => _.toString()),
                data: stats.statsPerYear.rockets.map<BarChartRocketData>(_ => {
                    return {
                        rocket: _.rocketName,
                        values: _.launches,
                        backgroundColor: getColor(_.rocketName).backgroundColor
                    }
                })
            }
            setPieChartData(pieData)
            setSuccessResults(successData)
            setBarChartData(barData)
        } catch (error) {
            alert("Erro ao buscar dados estatísticos")
        }
    }

    // todo: fazer lógica para gerar cor aleatória e atribuir mesma cor aos dois gráficos
    function getColor(rocket: string): ChartColor{
        let colors = [
            {rocket: 'Falcon 9', backgroundColor: '#F57C00', color: 'black'},
            {rocket: 'Falcon 1', backgroundColor: '#1267FC', color: 'black'},
            {rocket: 'Falcon Heavy', backgroundColor: '#D9D9D9', color: 'black'},
            {rocket: 'other', backgroundColor: 'black', color: 'white'},
        ]

        let find = colors.find(_ => _.rocket === rocket)
        if(find) return {color: find.color, backgroundColor: find.backgroundColor}
        return {color: 'white', backgroundColor: 'black'}
    }

    return (
        <div id='HomePage' className="flex flex-d-column align-items-center col-sm-12 col-xl-11">
            <header><RocketIcon /> Space X</header>
            <main className='flex flex-d-column align-items-center responsive'>
                <section id='StatsSection' className='flex flex-d-column responsive'>
                    <LauchesPerRocketSection data={pieChartData} results={successResults} />
                    <LaunchesPerYearSection data={barChartData} />
                </section>
                <section id='LaunchesSection' className='flex flex-d-column align-items-center responsive'>
                    <h3>Registros de lançamentos</h3>
                    <div id='LaunchesSectionSearchRow' className='flex flex-d-row align-items-center justify-content-center responsive'>
                        <div id='SearchInputContainer' className='col-sm-11 col-xl-10 flex flex-d-row align-items-center'>
                            <div id='SearchInputIcon'><SearchIcon /></div>
                            <input id='SearchInput' className='col-sm-10' type='text' placeholder='Search here' value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <button id='SearchButton' className='col-xl-2 hide flex-on-desktop align-items-center justify-content-center' onClick={SearchButtonPressed}>Buscar</button>
                    </div>
                    <Table data={launches} page={page} totalPages={totalPages} pageChanged={(pageSelected) => {setPage(pageSelected)}}/>
                </section>
            </main>
            <footer className='flex align-items-center'>Chalange Coodesh ©</footer>
        </div>
    );
}

export default HomePage;
