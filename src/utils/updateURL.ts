export function updateURL(searchString: string, page: number){
    let url = window.location.origin
    const params = new URLSearchParams()
    if(page) params.append('page', page.toString())
    if(searchString) params.append('search', searchString)
    if(page || searchString) url = `${url}?${params.toString()}`
    window.history.replaceState(null, '', url)
}