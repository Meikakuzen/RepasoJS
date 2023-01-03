import {heroes} from '../data/heroes.js'


/**
 * 
 * @param {HTMLDivElement} element 
 */


export const promisesComponent = (element)=>{
    
    const renderHero = (hero)=>{
        element.innerHTML = hero.name
    }

    const renderTwoHeroes = (hero1,hero2)=>{
        element.innerHTML=`
            <h3>${hero1.name}</h3>
            <h3>${hero2.name}</h3>
        `
    }


    const renderError = (error)=>{
        element.innerHTML = `
            <h1>Error</h1>
            <h3>${error}</h3>
        `
    }

const id1 = "5d86371f2343e37870b91ef1"
const id2= "5d86371f25a058e5b1c8a65e"

let hero1;

Promise.all([
    findHero(id1),
    findHero(id2)
]).then(([heroe1, heroe2])=>{
        renderTwoHeroes(heroe1,heroe2)
})
  .catch(renderError)


    /*
    findHero(id1)
        .then(hero=>{
            hero1= hero

            return findHero(id2)
        }).then(hero2=>{
            renderTwoHeroes(hero1, hero2)
        })
         .catch(renderError)
    */


   
}


/**
 * 
 * @param {String} id 
 * @returns {Promise<Object>}
 */

const findHero = (id)=>{

    return new Promise((resolve, reject)=>{
        const hero = heroes.find(heroe => heroe.id === id)

        if(hero){
            resolve(hero)
            return
        }

        reject(`Hero with id ${id} not found`)

    })

}


