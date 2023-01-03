
/**
 * 
 * @param {HTMLDivElement} element 
 */


export const promiseRaceComponent = (element)=>{
    
    const renderValue = (value)=>{
        element.innerHTML= value
    }
    Promise.race([
        slowPromise(),
        mediumPromise(),
        fastPromise()
    ]).then( renderValue )
}

const slowPromise = ()=> new Promise(resolve=>{
    setTimeout(()=>{
        resolve("Slow promise")
    }, 2000)
})
const mediumPromise = ()=> new Promise(resolve=>{
    setTimeout(()=>{
        resolve("medium promise")
    }, 1500)
})
const fastPromise = ()=> new Promise(resolve=>{
    setTimeout(()=>{
        resolve("fast promise")
    }, 1000)
})
