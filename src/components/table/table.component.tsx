import moment from 'moment'
import { Launch } from '../../models/launch.model'
import { Skeleton } from '../skeleton/skeleton.component'
import './table.component.css'
import { YoutubeIcon } from '../../assets/icons/youtube.icon'

type TableProps ={
    data?: Launch[],
    totalPages?: number,
    page?: number,
    pageChanged?: (page: number) => void
}
export function Table({data, totalPages, page, pageChanged}: TableProps){
    
    function PageSelected(page: number){
        if(pageChanged) pageChanged(page)
    }
    
    if(!data) return <div className='responsive' style={{height: '360px'}}><Skeleton /></div>
    
    return (
        <div className="LaunchesTable flex flex-d-column responsive">
            <div className='LaunchesTableContainer flex flex-d-column responsive'>
                {data.map((_,index) => 
                    <div key={index} className='LaunchesTableRow flex flex-d-row'>
                        <div className='flex flex-d-column align-items-center justify-content-center col-sm-4 bold row-gap-05em'>
                            <div>O</div>
                            <div>{_.flightNumber}</div>
                        </div>
                        <div className='flex flex-d-column align-items-center justify-content-center col-sm-4 bold row-gap-05em'>
                            <div>{_.name}</div>
                            <div>{moment(_.launchDate).format('DD/MM/YYYY')}</div>
                        </div>
                        <div className='flex flex-d-column align-items-center justify-content-center col-sm-4'>
                            <div>
                                <a href={ _.youtubeCode ? `https://www.youtube.com/watch?v=${_.youtubeCode}` : undefined}>
                                    <YoutubeIcon active={ _.youtubeCode ? true : false } />
                                </a>
                            </div>
                            <div>
                                <div className='flex align-items-center justify-content-center'>
                                    {_.success ? 
                                        <div className='success-background flex align-items-center justify-content-center'>SUCESSO</div> : 
                                        <div className='fail-background flex align-items-center justify-content-center'>FALHA</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <table>
                <thead >
                    <tr>
                        <th>N° Vôo</th>
                        <th>Logo</th>
                        <th>Missão</th>
                        <th>Data de lançamento</th>
                        <th>Foguete</th>
                        <th>Resultado</th>
                        <th>Vídeo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((_,index) => 
                        <tr key={index} className='LaunchesTableRowXl'>
                            <td>{_.flightNumber}</td>
                            <td>O</td>
                            <td>{_.name}</td>
                            <td>{moment(_.launchDate).format('DD/MM/YYYY')}</td>
                            <td>{_.rocket.name}</td>
                            <td>
                                <div className='flex align-items-center justify-content-center'>
                                    {_.success ? 
                                        <div className='success-background flex align-items-center justify-content-center'>SUCESSO</div> : 
                                        <div className='fail-background flex align-items-center justify-content-center'>FALHA</div>
                                    }
                                </div>
                            </td>
                            <td>
                                <a href={ _.youtubeCode ? `https://www.youtube.com/watch?v=${_.youtubeCode}` : undefined}>
                                    <YoutubeIcon active={ _.youtubeCode ? true : false } />
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            { page && totalPages ?
            <div className='LaunchesPageControll flex flex-d-row justify-content-end'>
                { page !== 1 ? <button onClick={() => {PageSelected(1)}}>1</button> : undefined }
                { page - 2 > 1 ? <span className='bold'>...</span> : undefined}
                { (page - 1) > 1 && page - 1 < totalPages ? <button onClick={() => {PageSelected(page - 1)}}>{page - 1}</button> : undefined}
                <button className='PageActive' onClick={() => {PageSelected(page)}}>{page}</button>
                { page + 1 < totalPages ? <button onClick={() => {PageSelected(page + 1)}}>{page + 1}</button> : undefined}
                { page + 2 < totalPages ? <span className='bold'>...</span> : undefined}
                { totalPages !== 1 && page !== totalPages ? <button onClick={() => {PageSelected(totalPages)}}>{totalPages}</button> : undefined} 
            </div>
            : undefined }
        </div>
    )
}