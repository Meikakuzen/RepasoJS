# CRUD NO FRAMEWORK

- No hat refresh del navegador
- Se aplica Clean Code, mappers

## Backend

- Para ir rápido se usará JSON server como dependencia de desarrollo

> npm i json-server

- Copio este gist en un json llamado db.json

> https://gist.githubusercontent.com/Klerith/7db7e20bda7161d827b6b70cc1e23d02/raw/07aee3601c46aac93c5edd414f1834c690dad2fa/db.json

- Creo el directorio /server
- Guardo el db.json y una copia de respaldo del db.json
- Creo un nuevo comando para el server

- package.json

~~~json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "json-server server/db.json --port 3001"
  },
~~~

- En la terminal

> npm run server

- Ahora puedo hacer peticiones desde POSTMAN
- Puedo paginar

> http://localhost:3001/users?_page=2

- El backend con json-server ofrece todos los tipos de petición de un CRUD completo: GET; PUT; PATCH; DELETE;
----

## Store central de la información

- Necesito sabver en qué página me encuentro y cuántos usuarios hay en esa página, porque así puedo construir una tabla bassada en esos usuarios
- Para ello voy a crearme un store centralizado con los datos
- En el objeto de db.json está escrito con snakeCase first_name y last_name intencionalmente para hacer luego un ejercicio y cambiarlo
- Borro el counter.js y dejo un div libre en el main 

- Creo en la carpeta src/users:
    - mappers: dónde tomar la info que luce de una manera y transformarla en otra
    - models: una representación de cómo quiero trabajar internamente la app. Esto la hará más robusta a cambios
    - presentation: dónde poner las funciones que van a servir para mostrárselas al usuario
    - store: lugar centralizado de la información
    - use-cases: dónde voy a tener funciones específicas que realizan algo en específico. Guardar datos, eliminar, etc

- Creo /store/users-store.js
- Creo un state. No lo exporto porque no quiero que nadie de afuera lo pueda manipular
- Creo unos métodos y los exporto por default
- También exporto la función getUsers y con el operador spread hago que en lugar de pasar el objeto por referencia, me traigo todos los users
- Los objetos pasan por referencia y los primitivos por valor, por eso currentPage va tal cual

~~~js
const state = {
    currentPage: 0,
    users: []
}

const loadNextPage = async ()=>{
    throw new Error('No implementado')
}

const loadPreviousPage = async ()=>{
    throw new Error('No implementado')
}


//cuando un usuario cambia, para implementar alguna actualización
const onUserChanged = ()=>{
    throw new Error('No implementado')
}

const reloadPage = async()=>{
    throw new Error('No implementado')
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    getUsers: ()=> [...state.users],
    getCurrentPage: ()=> state.currentPage
}
~~~
----

## Cargar Usuarios

- Creo el archivo en use-cases/load-users.js
- Creo el archivo .env para usar variables de entorno

> VITE_BASE_URL = http://localhost:3001

- Creo el archivo .env.template con las variables vacías, para que sirva de guía
- Le quito el seguimiento a .env en el .gitignore

- load-users.js

~~~js
/**
 * 
 * @param {Number} page
 * @returns ?? 
 */

export const loadUsersByPage = async (page= 1)=>{
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=2`

    const res = await fetch(url)
    const data = await res.json()

    console.log(data)
}
~~~

- Creo en la carpeta src/users/users-app.js

~~~js
import usersStore from  '../users/store/users-store'

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const UsersApp = async(element)=>{
    element.innerHTML = 'Loading...'
    await usersStore.loadNextPage()

}
~~~

- Me aseguro de invocar esta función en el main, habiendo hecho antes un querySelector al div

~~~js
import './style.css'
import javascriptLogo from './javascript.svg'
import { UsersApp } from './src/users/users-app'

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

const element = document.querySelector('.card')

UsersApp(element)
~~~

- Aparece Loading..., todo correcto
- Añado en el cuerpo de la función loadNextPage el loadUsersByPage()
- Uso el currentPage del state +1 porque lo inicialicé en 0
- Lo importo de use-cases/load-users

~~~js
const loadNextPage = async ()=>{
    await loadUsersByPage(state.currentPage+1)
}
~~~

----
## User Model y problemas relacionados

- Para cammbiar los nombres de las propiedades del objeto de la base de datos
- Para ello creo /models/user.js














