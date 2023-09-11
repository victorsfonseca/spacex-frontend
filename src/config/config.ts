export const config = {
    statsUrl: process.env.STATS_API_URL ?? 'http://localhost:5000/launches/stats',
    launchesUrl: process.env.LAUNCHES_API_URL ?? 'http://localhost:5000/launches'
}