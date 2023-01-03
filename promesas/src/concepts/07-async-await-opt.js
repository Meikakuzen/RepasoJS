
/**
 * 
 * @param {HTMLDivElement} element 
 */


export const asyncAwaitOptComponent = async (element)=>{

    console.time('Start')

    const [value1, value2, value3]= await Promise.all([
        slowPromise(),
        mediumPromise(),
        fastPromise()
    ])

    element.innerHTML=`
        value1: ${value1} </br>
        value2: ${value2} </br>
        value3: ${value3} </br>
    `
    console.timeEnd('Start')
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
