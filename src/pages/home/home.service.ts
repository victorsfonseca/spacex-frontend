import axios from "axios";
import { LaunchStatsReturn } from "../../models/launchStatsReturn.model";
import { PaginatedReturn } from "../../models/paginatedReturn.model";
import { Launch } from "../../models/launch.model";

const url = 'http://localhost:5000/launches/stats'
const launchesUrl = 'http://localhost:5000/launches'
export function HomeService(){
    async function searchStats():Promise<LaunchStatsReturn>{
        return new Promise(async (resolve,reject) => {
            try{
                resolve((await axios.get<LaunchStatsReturn>(url)).data)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function searchLaunches(search: string, page: number): Promise<PaginatedReturn<Launch>>{
        return new Promise<PaginatedReturn<Launch>>(async (resolve,reject) => {
            try{
                const params = new URLSearchParams()
                params.append('limit', '5')
                if(page) params.append('page', page.toString())
                if(search) params.append('search', search)
                resolve((await axios.get(`${launchesUrl}?${params.toString()}`)).data as PaginatedReturn<Launch>)
            } catch (error) {
                reject(error)
            }
        })
    }

    return{
        searchStats,
        searchLaunches
    }
}