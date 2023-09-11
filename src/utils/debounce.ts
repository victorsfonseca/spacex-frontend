export function debounce(func: Function, delay: number){
    const delayDebounceFn = setTimeout(func, delay);
      
    return () => clearTimeout(delayDebounceFn);
}