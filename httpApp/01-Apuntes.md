# PETICIONES HTTP

## Inicio proyecto

- Creo el proyecto

> npm create vite@latest

- cd a la carpeta

> npm i

- En el main.js dejo un div con la clase "card" y un h1 con la clase "app-title"
----

## Breaking Bad Component

> brakingbadapi.com

- Creo la carpeta src/breakingbad con el archivo breaking-bad-app.js
- Escribo la función con mayúscula porque quiero que representa la aplicación que estoy creando en js
- Es un componente

~~~js
/**
 * 
 * @param {HTMLDivElement} element 
 */

export const BreakingBadApp = (element)=>{

}
~~~

- Voy al main.js, selecciono con querySelector el div e importo BreakingBadApp y le paso el div como parámetro

~~~js
import './style.css'
import javascriptLogo from './javascript.svg'
import { BreakingBadApp } from './src/breakingbad/breaking-bad-app'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-tittle">Hello Vite!</h1>
    <div class="card">
   
    </div>
  </div>
`
const element = document.querySelector('.card')

BreakingBadApp(element)
~~~

- Si le coloco un console.log en el cuerpo de BreakingBadApp podré verlo en consola
- Cómo quiero hacer una tarea asíncrona, mientras se resuelve le puedo colocar un loading...
- Cambio el h1

~~~js
export const BreakingBadApp = (element)=>{

    document.querySelector('#app-tittle').innerHTML = "Breaking Bad App"
    element.innerHTML = "Loading..."

}
~~~

----
## Postman

- Abro una pestaña con +
- hago una petición GET a la API

    NOTA: No funciona la API de Breaking Bad. Se usará POKEMON API

> https://pokeapi.co/api/v2/pokemon/ditto

- Recibo un objeto
- Dentro del objeto hay una propiedad llamada abilities con un arreglo
---

# Fetch API

- Encapsulo la petición en una función
~~~js
const fetchQuote = async () =>{
    
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    const data = await response.json()

    console.log(data.abilities)
    return data
} 
~~~

- Puedo guardar el resultado de esta promesa en una variable

~~~js
const pokemon = async fetchQuote()
~~~

- Por supuesto puedo usar desestructuración
- Puedo cambiar el loading por tenemos data

~~~js
export const BreakingBadApp = async (element)=>{

    document.querySelector('#app-tittle').innerHTML = "Breaking Bad App"
    element.innerHTML = "Loading..."

    const {abilities}= await fetchQuote()

      element.innerHTML = "Tenemos data!!"
    
      console.log(abilities)
}
~~~

- Para renderizarlo en pantalla hay que observar el objeto de respuesta

~~~js
export const BreakingBadApp = async (element)=>{

    document.querySelector('#app-tittle').innerHTML = "Breaking Bad App"
    element.innerHTML = "Loading..."

    const {abilities, moves, species} = await fetchQuote()
    
    element.innerHTML= JSON.stringify(abilities[0].ability.name)  
}
~~~











