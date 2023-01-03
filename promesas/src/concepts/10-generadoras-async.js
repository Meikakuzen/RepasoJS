import {heroes} from '../data/heroes'

/**
 * 
 * @param {HTMLDivElement} element 
 */


export const generatorsAsyncComponent = async (element)=>{
    
    const heroGenerator = getHeroGenerator()
    let isFinsihed = false
    
    do {
        const {value, done} = await heroGenerator.next()
        isFinsihed = done

        element.innerHTML = value

        

    } while (!isFinsihed);

}

async function* getHeroGenerator(){
    for(let hero of heroes){
        await sleep()
        yield hero.name
    }

    return 'No hay más héroes'

}

const sleep = ()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        }, 1000)
    })
}