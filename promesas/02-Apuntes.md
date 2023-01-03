# ASYNC AWAIT

## ASYNC

- Copio demo.js y renombro demo-copy.js a async.js. renombro el componente y lo importo e invoco en el main
- Si le añado async a findHero se convierte en una promesa que va a devolver lo que sea que yo ponga en el return

~~~js
import { heroes } from "../data/heroes"

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const asyncComponent = (element)=>{
    
    const id1 = "5d86371f1efebc31def272e2"

    findHero(id1).then(hero => element.innerHTML = hero.name)
}

/**
 * 
 * @param {String} id 
 * @returns {Promise<Object>}
 */

const findHero = async (id) =>{
    const hero = heroes.find(hero=> hero.id === id)
    return  hero //devuelve una promesa
}
~~~

- Puedo usar la desestructuración para extraer el name

~~~js
export const asyncComponent = (element)=>{
    
    const id1 = "5d86371f1efebc31def272e2"

    findHero(id1)
    .then(({name}) => element.innerHTML = name)
    .catch(error=> element.innerHTML= error)
}
~~~

- En este contexto no tiene mucho sentido, pero en llamadas externas a la computadora si
- Pero qué pasa si no devuelve un heroe? En la próxima lección
----

## Manejo de errores en funciones asíncronas

- Las funciones asíncronas o que trabajan con promesas no siguen el hilo principal
- JS coloca la promesa en una pila de tareas por hacer
- Un return en una función asíncrona siempre significa que todo salió bien
- Puedo manjar el error de esta manera

~~~js
/**
 * 
 * @param {String} id 
 * @returns {Promise<Object>}
 */

const findHero = async (id) =>{
    const hero = heroes.find(hero=> hero.id === id)

    if(!hero) throw new Error(`Hero with id ${id} not found`)

    return  hero
}
~~~
- Lo que realmente va a evitar el promise hell es el await

----

## async-await

- Copio el demo, lo renombro a async-await, renombro el componente, lo importo e invoco en el main
- Con el uso del await me devuelve el objeto. Sin el await, la promesa

~~~js
import {heroes} from '../data/heroes'


/**
 * 
 * @param {HTMLDivElement} element 
 */


export const asyncAwaitComponent = async (element)=>{
    
    const id1 = "5d86371f2343e37870b91ef1"
    const id2 = "5d86371f25a058e5b1c8a65e"

    const hero1 = await findHero(id1)
    const hero2 = await findHero(id2)

    element.innerHTML = `${hero1.name}, ${hero2.name}`

}


const findHero = async(id)=>{
    const hero = heroes.find(hero => hero.id === id)
    if(!hero) throw new Error('Hero not found')

    return hero
}
~~~

- Adiós callback/promise hell, gracias al maravilloso async await+
- Aunque hecho de esta forma pierde velocidad de performance
- Se puede desestructurar el resultado de la promesa

~~~js
export const asyncAwaitComponent = async (element)=>{
    
    const id1 = "5d86371f2343e37870b91ef1"
    const id2 = "5d86371f25a058e5b1c8a65e"

    const {name} = await findHero(id1)
    const {name: name2} = await findHero(id2)

    element.innerHTML = `${name}, ${name2}`

}
~~~

- Antes de mejorar la velocidad de performance, vamos a ver como manejar los errores
----

## Errores en async-await

- Mediante un try y un catch

~~~js
export const asyncAwaitComponent = async (element)=>{
    
    const id1 = "5d86371f2343e37870b91ef1"
    const id2 = "5d86371f25a058e5b1c8a65e"

    try {
        const hero1 = await findHero(id1)
        const hero2 = await findHero(id2)

        element.innerHTML = `${hero1.name}, ${hero2.name}`
        
    } catch (error) {
        element.innerHTML = error
    }
}
~~~

- Si pongo un id que no existe me devuelve 'Hero not found' como puse en el condicional del findHero con el throw
----

## Optimizar promesas no secuenciales

- Promesas no secuenciales son en las que un valor no depende del siguiente
- Copio demo.js y lo renombro a async-await-opt.js, lo mismo con el componente. Lo importo e invoco en el main pasándole element como parámetro
- Copio el código del 04 slowPromise, mediumPromise y fastPromise y lo pego en el 07 ( dónde estoy ahora )

~~~js

/**
 * 
 * @param {HTMLDivElement} element 
 */


export const asyncAwaitOptComponent = async (element)=>{

    console.time('Start')

    const value1 = await slowPromise()
    const value2 = await  mediumPromise()
    const value3 = await fastPromise()

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
~~~

- Hecho de esta manera, el 'Start' en consola aparece 4 segundos más tarde
- Pero cada una de las promesas son independientes, no tiene sentido realizarlas secuencialmente
- Para ello uso el Promise.all
- En lugar de poner el .then, uso el await
- Cómo sé que devuelve un arreglo puedo desestructurar los valores 

~~~js

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
~~~

- Ahora tarda la mitad
- Puedo hacerlo dentro de un try y un catch para manejar el error
----

## for await y if await

- Copio el demo.js y lo renombro a for-await. Copio el contenido del gist

~~~js
import { heroes } from '../data/heroes';
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const forAwaitComponent = async( element ) => {



}

/**
 * 
 * @param {Array<String>} heroIds 
 * @returns {Array<Promise>}
 */
const getHeroesAsync = ( heroIds ) => {
    
    const heroPromises = [];

    heroIds.forEach( id => {
        heroPromises.push( getHeroAsync(id)  );
    });

    return heroPromises;
}

const getHeroAsync = async(id) => {

    await new Promise(( resolve ) => {
        setTimeout(() => resolve(), 1000)
    });

    return heroes.find( hero => hero.id === id );
}
~~~

- getHeroeAsync se demora un segundo y luego regresa un heroe ( simula una petición http )
- Puedo usarla para que me devuelva un objeto heroe con el await

~~~js
export const forAwaitComponent = async( element ) => {

    const id = "5d86371f25a058e5b1c8a65e"

    const hero = await getHeroAsync(id)

    console.log(hero)
}
~~~

- Para manejar el error puedo usar el if

~~~js
export const forAwaitComponent = async( element ) => {

    const id = "5d86371f25a058e5b1c8a65e"

    if( await getHeroAsync(id)){
        element.innerHTML = "Si existe el héroe"
        return
    } 
    element.innerHTML = "No existe el heroe"

}
~~~

- getHeroesAsync regresa un arreglo de promesas
- Recibe un arreglo de id's, y por cada id almacena la promesa en el array
- Puedo extraer todos los id's facilmente con .map
- Con getHeroesAsync obtengo un arreglo de promesas

~~~js
export const forAwaitComponent = async( element ) => {

    const id = "5d86371f25a058e5b1c8a65e"

    const heroIds = heroes.map(hero => hero.id)

    const heroPromises = getHeroesAsync(heroIds)
    
}
~~~

- Puedo usar el for await, for porque quiero barrer cada una de ellas, y el await para que espere a que estas resuelvan
- Concateno con += los nombres con un salto de linea

~~~js
export const forAwaitComponent = async( element ) => {

    const id = "5d86371f25a058e5b1c8a65e"

    const heroIds = heroes.map(hero => hero.id)
    
    const heroPromises = getHeroesAsync(heroIds)

    for await(const hero of heroPromises){
        element.innerHTML += `${hero.name} </br>`
    }

}
~~~

----

## Funciones generadoras

- Copio demo bla bla
- Las funciones generadoras son algo bastante nuevo, es difícil verle la utilidad en un ejercicio
- Una función generadora no se puede usar mediante función de flecha
- Pueden ser asíncronas
- El yield es cómo ceder. Es como un return, cuando encuentra un yield se va a pausar

~~~js
export const generatorFunctionsComponent = (element)=>{
    
    const myGenerator = myFirstGeneratorFunction();

    console.log(myGenerator.next()) //devuelve "Primer valor"

}

function* myFirstGeneratorFunction(){

    yield "Primer valor"
    yield "Segundo valor"
    yield "Tercer valor"

    return "No hay más valores"
}
~~~

- Esto devuelve un objeto con value: "Primer Valor" y done: false
- El done es cuando mandamos el return significa que ya no hay más valores después
- Si sigo poniendo next me manda los valores sucesivos

~~~js
export const generatorFunctionsComponent = (element)=>{
    
    const myGenerator = myFirstGeneratorFunction();

    console.log(myGenerator.next()) //devuelve "Primer valor"
    console.log(myGenerator.next()) //devuelve "Segundo valor"
    console.log(myGenerator.next()) //devuelve "Tercer valor"
    console.log(myGenerator.next()) //devuelve "No hay más valores" y el done: true
}
~~~

- Si sigo llamando al next obtendré undefined
---

## Ejemplo de función generadora

- Voy a crear una función para generar id's
- Le pongo ++ primero para que primero incremente el valor y luego lo asigne

~~~js
export const generatorFunctionsComponent = (element)=>{
    
    const myGenerator = myFirstGeneratorFunction();

   /* console.log(myGenerator.next()) //devuelve "Primer valor"
    console.log(myGenerator.next()) //devuelve "Segundo valor"
    console.log(myGenerator.next()) //devuelve "Tercer valor"
    console.log(myGenerator.next()) //devuelve "No hay más valores" y el done: true
    */
    const id = idGenerator()

    console.log(id.next()) // devuelve 1
    console.log(id.next()) // devuelve 2
    console.log(id.next()) // devuelve 3
    console.log(id.next())
    console.log(id.next())


}


function* idGenerator(){
    let currentId = 0
    while(true){
        yield ++currentId
    }
}
~~~

- Agrego un botón
- Creo una función y desestructuro del .next el value
- Añado un listener para que ejecute con cada click

~~~js
export const generatorFunctionsComponent = (element)=>{
    
    const myGenerator = myFirstGeneratorFunction();

    const id = idGenerator()

   const button = document.createElement('button')

   button.innerText = 'Click me'
   element.append(button)

   const renderButton = ()=>{
    const {value} = id.next()

    button.innerText = `Click ${value}`

    }

    button.addEventListener('click', renderButton)


}

~~~

----

## Funciones generadoras asíncronas

- Copio demo.js bla bla
- Creo una función llamada sleep que va a demorar un segundo en completarse
- Creo una función generadora con un bucle for
- Uso el await para el sleep, lo que demorará un segundo en resolver y devolverá cada hero.name con un segundo de delay
- Uso un ciclo dowhile, cómo condición le pongo que mientras el next().done siga en falso, renderice un nombre

~~~js
import {heroes} from '../data/heroes'

/**
 * 
 * @param {HTMLDivElement} element 
 */


export const generatorsAsyncComponent = async (element)=>{
    
    const heroGenerator = getHeroGenerator()

    do {
        element.innerHTML= (await heroGenerator.next()).value
        
    } while (!(await heroGenerator.next().done));

}

async function* getHeroGenerator(){
    for(let hero of heroes){
        await sleep()
        yield hero.name
    }

}

const sleep = ()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        }, 1000)
    })
}
~~~
- Como usé dos veces el next, hubo valores que no los ha impreso en pantalla
- Mejor hacerlo de esta manera

~~~js
export const generatorsAsyncComponent = async (element)=>{
    
    const heroGenerator = getHeroGenerator()
    let isFinsihed = false
    
    do {
        const {value, done} = await heroGenerator.next()
        isFinsihed = done

        element.innerHTML = value

        

    } while (!isFinsihed);

}
~~~

- Así como último valor devuelve un undefined.
- Para evitarlo coloco un return en la función getHerogenerator

~~~js

async function* getHeroGenerator(){
    for(let hero of heroes){
        await sleep()
        yield hero.name
    }

    return 'No hay más héroes'

}
~~~

# FIN


