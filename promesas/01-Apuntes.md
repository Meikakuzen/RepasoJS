# PROMESAS

- Creo el proyecto con Vite, Vanilla Javascript

> npm create vite@latest

- Entro a la carpeta e instalo las dependencias

> npm i

- Pongo en marcha el proyecto

> npm run dev

- Dejo la aplicación solo con los logos y el h1. Borro el archivo counter.js

~~~js
import './style.css'
import javascriptLogo from './javascript.svg'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
  
    </div>
 
  </div>
`

~~~

## Variables de entorno

- Vite ya viene con una forma de leer las variables de entorno, no hace falta instalar dotenv
- Añado .env al gitignore pero antes hago una copia y lo renombro a .env.template con los nombres de las variables vacías
- Para hacer referencia a las variables de entorno:
    - Creo una carpeta src
    - Dentro creo una carpeta llamada concepts, y dentro de esta un archivo llamado environments.js
    - Creo una función, le paso como parámetro el elemento html en el que quiero renderizar lo que sea.
    - Añado el comentario con /**/. 
    - Para que muestre las sugerencias ctrl+space

~~~js
/**
 * 
 * @param {HTMLDivElement} element 
 */


export const environmentsComponent = (element)=>{
    
    const html = `
    variables
    `;

    element.innerHTML = html
}
~~~

- Voy al main e importo la función. Selecciono el elemento con querySelector

~~~js
const element = document.querySelector('.card')

environmentsComponent(element)
~~~

- Aparece en pantall "variables"
- Vite no trabaja con process.env
- Vite usa import.meta.env
- Puedo hacer un console.log de import.meta.env para ver las variables de entorno que tiene por defecto Vite, como DEV, PROD
- Para que Vite pueda leer las variables de entorno que he configurado debo añadirle VITE_ al principio
- .env

> VITE_BASE_URL = http://localhost:5173

- Puedo imprimir las variables de entorno en pantalla

~~~js
export const environmentsComponent = (element)=>{
    
    console.log(import.meta.env)

    const html = `
        Dev: ${import.meta.env.DEV} </br>
        Url: ${import.meta.env.VITE_BASE_URL}
    `;
    element.innerHTML = html
}
~~~

## Componente rápido para futuros ejercicios

- Copio todo lo que hay en environments.js y lo pego en un archivo llamado src/concepts/demo.js
- Me quedo con el cascarón
- demo.js

~~~js
/**
 * 
 * @param {HTMLDivElement} element 
 */

export const demoComponent = (element)=>{
    

}
~~~

## Callbacks

- Un callback no es más que una función que recibe como argumento otra función y se invoca
- Copio del repositorio el archivo json de héroes la data y lo copio en src/data/heroes.js
- Lo guardo en una variable heroes y lo exporto

~~~js
export const heroes= [{
		"id": "5d86371f1efebc31def272e2",
		"about": "Ipsum duis incididunt ullamco tempor. Amet incididunt Lorem consequat labore culpa. Pariatur amet veniam reprehenderit sunt laborum excepteur. Labore eu ut ut Lorem labore aliqua quis ex elit nulla in incididunt commodo aliquip. Velit excepteur eiusmod Lorem esse officia. Irure aliquip Lorem fugiat voluptate dolor duis consectetur aliquip pariatur tempor reprehenderit deserunt.",
		"picture": "https://www.sideshow.com/storage/product-images/903421/iron-man_marvel_gallery_5c4cced10da7f.jpg",
    "squarePic": "https://dam.smashmexico.com.mx/wp-content/uploads/2018/06/27181227/ironman_portada2.jpg",
		"name": "Iron Man"
	},
	{
		"id": "5d86371f2343e37870b91ef1",
		"about": "Mollit officia ad excepteur anim proident incididunt eiusmod mollit consectetur id sit velit. Laborum ut magna officia qui laboris eiusmod do culpa. Culpa dolor officia velit cillum culpa deserunt cupidatat cillum ipsum laborum.",
		"picture": "https://vignette.wikia.nocookie.net/marvelvscapcom/images/5/5d/HulkBruce.png/revision/latest?cb=20170818123736",
    "squarePic": "https://bolavip.com/__export/1557252167649/sites/bolavip/img/2019/05/07/hulk_crop1557252167265.jpg_1693159006.jpg",
		"name": "Hulk"
	},
	{
		"id": "5d86371f25a058e5b1c8a65e",
		"about": "Laboris est duis eiusmod adipisicing cillum ut sit ea Lorem non laboris quis Lorem. Est culpa esse aliqua non labore dolor esse labore nulla mollit. Nostrud amet est quis adipisicing dolor. Labore veniam elit veniam non ad ex consequat excepteur eiusmod. Minim cupidatat velit Lorem culpa quis consequat incididunt qui amet incididunt pariatur ex aliquip aliqua. Magna ex elit in aliquip minim eu ut ut fugiat ullamco deserunt adipisicing cillum.",
		"picture": "https://i.pinimg.com/736x/ba/9b/36/ba9b3623c9a639296e85f7ff09c3c205.jpg",
		"name": "Captain America"
	},
	{
		"id": "5d86371f9f80b591f499df32",
		"about": "Ipsum tempor sunt Lorem est. Fugiat nisi velit veniam labore et ullamco minim adipisicing do culpa. Cillum voluptate reprehenderit aute consectetur.",
		"picture": "http://im.rediff.com/movies/2019/mar/06captain-marvel1.jpg",
    "squarePic": "https://img.chilango.com/2018/05/quien-es-capitan-marvel.jpg",
		"name": "Captain Marvel"
	},
	{
		"id": "5d86371f233c9f2425f16916",
		"about": "Deserunt voluptate aliquip ex dolor Lorem exercitation aliqua nisi fugiat aliquip sunt non. Eu cillum enim velit exercitation officia proident exercitation ipsum exercitation Lorem nulla do. Minim sint dolor nostrud ipsum laborum. Velit ea ad ad consectetur nisi Lorem laborum officia esse. Do eu incididunt eiusmod voluptate excepteur consequat ipsum ad. Quis veniam exercitation eiusmod amet non non eu aliquip quis ea. Tempor deserunt nulla adipisicing qui fugiat ipsum labore duis et ea consectetur.",
		"picture": "https://m.media-amazon.com/images/M/MV5BYTU4NmRhNTctMjI2ZS00ZTUyLWI1ZjEtZWU1ODAxMjM5MzlmXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UY1200_CR165,0,630,1200_AL_.jpg",
    "squarePic": "https://wipy.tv/wp-content/uploads/2019/07/filtran-el-tr%C3%A1iler-de-%E2%80%98Black-Widow%E2%80%99.jpg",
		"name": "Black Widow"
	},
	{
		"id": "5d86371f97c29d020f1e1f6d",
		"about": "Esse magna Lorem ipsum incididunt sit. Enim eiusmod proident in adipisicing anim excepteur laborum magna aliqua adipisicing ad qui aliqua. Eiusmod enim ullamco laboris adipisicing tempor sint labore. Exercitation cupidatat incididunt nostrud velit nisi aute eu ex pariatur deserunt mollit. Deserunt nisi enim irure elit. Aute amet amet consequat laborum dolor sint anim Lorem id fugiat commodo cupidatat ad. Ipsum quis enim consectetur occaecat laboris esse.",
		"picture": "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/48/Falcon_AIW_Profile.jpg/revision/latest/scale-to-width-down/310?cb=20180518212822",
    "squarePic": "https://www.tooys.mx/pub/media/catalog/product/cache/89d4a95274a31fe8bdfcc437494b2c9e/f/a/falcon_marvel_gallery_5c4dc5df6c14d_-_copia.jpg",
		"name": "Falcon"
	},
	{
		"id": "5d86371fd55e2e2a30fe1ccb",
		"about": "Id aute in dolore dolor in incididunt dolore duis do mollit officia. Ullamco pariatur eiusmod laborum culpa quis non occaecat ad cillum dolore labore aliqua. Elit magna commodo aliquip laborum aliqua duis.",
		"picture": "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/9/99/Black_Panther_AIW_Profile.jpg/revision/latest/scale-to-width-down/310?cb=20180518212436",
    "squarePic": "http://www.mundocinematografico.net/wp-content/uploads/2018/02/black-panther-marvel-cosas-felices.jpg",
		"name": "Black Panther"
	},
	{
		"id": "5d86371fd55e2e2a30fe1ccb1",
		"about": "Id aute in dolore dolor in incididunt dolore duis do mollit officia. Ullamco pariatur eiusmod laborum culpa quis non occaecat ad cillum dolore labore aliqua. Elit magna commodo aliquip laborum aliqua duis.",
		"picture": "https://www.outland.no/media/catalog/product/cache/6f3b753be090e58846a92333dfe1de97/4/8/4897011186276_4.jpg",
    "squarePic": "https://img-cdn.hipertextual.com/files/2019/09/hipertextual-filtracion-revela-que-doctor-strange-2-resucitara-dos-personajes-muertos-marvel-2019435911.jpg?strip=all&lossy=1&quality=57&resize=740%2C490&ssl=1",
		"name": "Doctor Strange"
	}, {
		"id": "5d86371fd55e2e2a30fe1ccb2",
		"about": "Id aute in dolore dolor in incididunt dolore duis do mollit officia. Ullamco pariatur eiusmod laborum culpa quis non occaecat ad cillum dolore labore aliqua. Elit magna commodo aliquip laborum aliqua duis.",
		"picture": "https://www.sideshow.com/storage/product-images/903735/spider-man-advanced-suit_marvel_silo.png",
    "squarePic": "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/09/28/15696592030335.jpg",
		"name": "Spider Man"
	},
	{
		"id": "5d86371fd55e2e2a30fe1cc3",
		"about": "Id aute in dolore dolor in incididunt dolore duis do mollit officia. Ullamco pariatur eiusmod laborum culpa quis non occaecat ad cillum dolore labore aliqua. Elit magna commodo aliquip laborum aliqua duis.",
		"picture": "https://fsmedia.imgix.net/f5/ba/d8/66/7dd4/44e9/8e0a/d91348489582/ant-man-and-the-wasp-2018.jpeg#image",
    "squarePic": "https://img.chilango.com/2018/05/quien-es-capitan-marvel.jpg",
		"name": "Ant Man"
	},
	{
		"id": "5d86371fd55e2e2a30fe1cc4",
		"about": "Id aute in dolore dolor in incididunt dolore duis do mollit officia. Ullamco pariatur eiusmod laborum culpa quis non occaecat ad cillum dolore labore aliqua. Elit magna commodo aliquip laborum aliqua duis.",
		"picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Qum9HPm82yeUaFuMhpo3A98HbgsyUSDmk1cUNS4C2rb31BHZ2w",
    "squarePic": "https://img.chilango.com/2018/05/quien-es-capitan-marvel.jpg",
		"name": "The Wasp"
	}
]
~~~

- Copio el demo.js en un archivo que llamaré callbacks
- Voy a crear una función para buscar un heroe por id
- Le añado el id y el callback como parámetro
- Uso el .find y lo guardo en heroe
- En lugar de llamar un return, llamo el callback

~~~js
import { heroes } from "../data/heroes"

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const callbacksComponent = (element)=>{
    

}

/**
 * 
 * @param {String} id 
 * @param {Function} callback 
 */

const findHeroeById = (id, callback)=>{
    const heroe= heroes.find(heroe => heroe.id === id)
    callback(heroe)
}
~~~

- Busco un id en el json, lo declaro y lo añado como argumento a la función findHeroe
- Describo en la documentación que el callback recibe un heroe de yipo objeto y no regresa nada
- Le paso el heroe (se puede llamar cómo yo quiera, Hulk, que es el heroe que voy a retornar)
- Renderizo en el html el nombre con Hulk.name

~~~js
import { heroes } from "../data/heroes"

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const callbacksComponent = (element)=>{
    
    const id = "5d86371f2343e37870b91ef1"

    findHeroeById(id, (Hulk)=>{
        element.innerHTML = Hulk.name
    })

}

/**
 * 
 * @param {String} id 
 * @param {(heroe:Object)=> void} callback 
 */

const findHeroeById = (id, callback)=>{
    const heroe= heroes.find(heroe => heroe.id === id)
    callback(heroe)
}
~~~

- Voy al main y llamo a la función

~~~js
const element = document.querySelector('.card')

callbacksComponent(element)
~~~

- Ahora se puede ver el fuincionamiento del callback.
- Primero busca con el id el heroe, y luego ejecuta el callback
- Se puede desestructurar el name si es lo único que me interesa

~~~js
export const callbacksComponent = (element)=>{
    
    const id = "5d86371f2343e37870b91ef1"

    findHeroeById(id, ({name})=>{
        element.innerHTML = name
    })

}
~~~
- Pero si el id no existe salta error

## Manejo de errores

- Para evaluar si el heroe existe puedo usar el ?
- Si no existe dará undefined pero no reventará. Puedo usar el operador or para mostrar un string

~~~js
export const callbacksComponent = (element)=>{
    
    const id = "5d86371f2343e37870b91ef1"

    findHeroeById(id, (heroe)=>{
        element.innerHTML = heroe?.name || "No hay héroe"
    })

}
~~~

- Pero pongamos que quiero manejar el error de otra manera, y quiero saber porqué no tengo un héroe
- Para ello voy a cambiar la firma de este callback y añadirle error cómo parámetro.
  - Le añado el interrogante para declarar que es opcional
  - Tambien podría  usar error: String|Null
- Uso el if para declarar que si no existe el heroe, llamo el callback pero el primer argumento es el motivo por el cual no está el heroe
- Añado el return para detener la ejecución (regresa undefined porque todas las funciones en JavaScript regresan algo)
- Tengo que definir el primer argumento del callback como error. 

~~~js
import { heroes } from "../data/heroes"

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const callbacksComponent = (element)=>{
    
    const id = "5d86371f2343e37870b91ef1"

    findHeroeById(id, (error, heroe)=>{
        element.innerHTML = heroe.name 
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
~~~

- Ahora puedo renderizar el error

~~~js
export const callbacksComponent = (element)=>{
    
    const id = "5d86371f2343e37870b91ef"

    findHeroeById(id, (error, heroe)=>{
        
        if ( error ){
            element.innerHTML = error
            return
        }
        element.innerHTML = heroe.name 
    })

}
~~~

- Si está mal el id renderiza en pantalla heroe con id idfjpsodifjsdf no encontrado
- Actualmente xisten otras alternativas para evitar esto, hacerlo ha sido por **motivos didácticos**

## CallbackHell

- CallbackHell es cuando hay callbacks que llaman a otros callbacks que internamente llaman a otros callbacks, etc
- También hay promisesHell, ifElseHell, etc
- Pongamos que quiero renderizar dos heroes
- Tengo disponible heroe1 porque está dentro del mismo scope
- Si no hubiera ningún error referenciado en el segundo findHeroeById, el error del scope apuntaría al del primer findHeroeById

~~~js
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
~~~

- Si necesitara un tercer heroe o un cuarto sería muy dificil de mantener
- El uso de callbacks es bastante generalizado, pero se está moviendo al uso de promesas

# PROMESAS

- Copio el demo.js y lo renombro a promesas
- Lo importo en el main y le paso cómo parámetro element
- Vamos con el código! En promesas.js
- Declaro la misma función de findHeroe
- El standard de las promesas son dos argumentos, resolve y reject
- Resolve va a contener el valor producto de la promesa
- El reject, es que falló y no consiguió realizar la promesa
- Entonces, en el código, si encuentro el heroe llamo al resolve y devuelvo el heroe
- Solo se puede mandar un resolve pero la ejecución de la función sigue
- Mando el reject y retorno la promesa

~~~js

/**
 * 
 * @param {String} id 
 * @returns {Promise<Object>}
 */

const findHero = (id)=>{

    const promesa = new Promise((resolve, reject)=>{
        const hero = heroes.find(heroe => heroe.id === id)

        if(hero){
            resolve(hero)
            return
        }

        reject(`Hero with id ${id} not found`)

    })

    return promise
}
~~~

- Para qué crear una variable si luego la retorno, puedo retornarla directamente

~~~js
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
~~~

## Utilizar una promesa

- Escribo una función dentro de promiseComponent para renderizar el nombre del heroe

~~~js
export const promisesComponent = (element)=>{
    
    const renderHero = (hero)=>{
        element.innerHTML = hero.name
    }

}
~~~

- Para usar la promesa mando a llamar la función, le paso el id ( que he declarado antes como variable)
- Uso el .then para obtener el resultado de la promesa y llamo a la función renderHero para que renderice el heroe resultante

~~~js
export const promisesComponent = (element)=>{
    
    const renderHero = (hero)=>{
        element.innerHTML = hero.name
    }

    const id1 = "5d86371f9f80b591f499df32"

    findHero(id1).then(superHero=> renderHero( superHero ))

}
~~~

    NOTA: este código se puede simplificar muchísimo más, es solo con fines didácticos

- Cuando el único valor del argumento es pasárselo a la función, se puede obviar y mandar directamente la función como referencia, renderHero en este caso. 
- Esto es válido para más de un argumento

~~~js
 
export const promisesComponent = (element)=>{
    
    const renderHero = (hero)=>{
        element.innerHTML = hero.name
    }

    const id1 = "5d86371f2343e37870b91ef1"

    findHero(id1).then(renderHero)

}
~~~

- Para manejar el error creo otra función llamada renderError
- Lo atrapo con el catch

~~~js

export const promisesComponent = (element)=>{
    
    const renderHero = (hero)=>{
        element.innerHTML = hero.name
    }


    const renderError = (error)=>{
        element.innerHTML = `
            <h1>Error</h1>
            <h3>${error}</h3>
        `
    }


    const id1 = "5d86371f2343e37870b91ef1"

    findHero(id1)
        .then(renderHero)
        .catch(renderError)

}
~~~

## Promise Hell

- Para evitar el promise hell una posibilidad es usar el Promise.all
- Creo una función en el promiseComponent para renderizar los dos heroes 

~~~js
    const renderTwoHeroes = (hero1,hero2)=>{
        element.innerHTML=`
            <h3>${hero1.name}</h3>
            <h3>${hero2.name}</h3>
        `
    }
~~~
- En la primera promesa retorno otra promesa y yo puedo conectarme (promesas en cadena ) y tener el resultado de la primera promesa
- Saco la referencia del hero1 porque en el scope no tengo acceso a este
- Puedo manejar un único catch para los dos

~~~js
let hero1;

    findHero(id1)
        .then(hero=>{
            hero1= hero

            return findHero(id2)
        }).then(hero2=>{
            renderTwoHeroes(hero1, hero2)
        })
         .catch(renderError)
~~~

- En el momento que se retorna otra promesa se pueden hacer estas cadenas
- Tampoco es la forma más optima, la mejor manera sería el Promise.all
- Se le pasa un arreglo de promesas
- Esto se puede hacer con promesas que no dependen del resultado entre si
  - Para las que si dependen del resultado anterior se puede usar la forma anterior
- Con el Promise.all, si una de las promesas falla todo falla, y el error se atrapa con el catch
- En el then obtengo un arreglo con el resultado de las promesas
  - Puedo desestructurar el arreglo posicionalmente, el primero será heroe1, el segundo heroe2
- De esta manera se mandan a llamar ambas promesas de forma simultánea

~~~js
 
const id1 = "5d86371f2343e37870b91ef1"
const id2= "5d86371f25a058e5b1c8a65e"


Promise.all([
    findHero(id1),
    findHero(id2)
]).then(([heroe1, heroe2])=>{
        renderTwoHeroes(heroe1,heroe2)
})
  .catch(renderError)

~~~

- Hay otras técnicas para realizar esto

## Promise Race

- Copio y pego el demo.js, lo renombro a promise-race, renombro el componente a promiseRaceComponent, lo importo en main.js y le paso el element como argumento
- Este método va muy bien cuando tengo varias promesas y solo quiero el resultado de la primera promesa que resuelva más rápido
- Creo una función llamada renderValue y le paso un value como argumento. En el cuerpo pongo que renderice este value en el HTML
- Creo 3 promesas en funciones
- Uso el setTimeOut para darles diferentes valores de resolución, 2 seg, 1.5 seg, 1 seg

~~~js
export const promiseRaceComponent = (element)=>{
    
    const renderValue = (value)=>{
        element.innerHTML= value
    }
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

- Uso el Promise.race igual que uso el Promise.all. Renderizará la que primera resuelva

~~~js
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
~~~

## Próximo capítulo: ASYNC AWAIT























