import { heroes } from "../data/heroes"

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const callbacksComponent = (element)=>{
    
    const id1 = "5d86371f2343e37870b91ef1"
    const id2 = "5d86371f25a058e5b1c8a65e"

    findHeroeById(id1, (error, heroe1)=>{
        
        if ( error ){
            element.innerHTML = error
            return
        }
        
        findHeroeById(id2, (error, heroe2)=>{
            
            if ( error ){
                element.innerHTML = error
                return
            }
            element.innerHTML = `${heroe1.name} / ${heroe2.name}`
        })
    })


}

/**
 * 
 * @param {String} id 
 * @param {(error: String|Null, heroe:Object)=> void} callback 
 */

const findHeroeById = (id, callback)=>{
    const heroe= heroes.find(heroe => heroe.id === id)

    if(!heroe){
        callback(`Hero with id ${id} not found`)
        return
    }

    callback(null, heroe)
}

