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
- La idea de este user va a ser el objeto de usuario que voy a manejar en la app
- Podría ser como una representación del usuario en la base de datos
- Es la data que necesito para trabajar, no como viene en el backend
- La idea es que el constructor reciba la data tal y como la estoy esperando
- Desestructuro las propiedades 

~~~js

/**
 * @param {Like<User>} userDataLike   //le pongo Like User porque es algo que luce como un usuario, no tiene porque ser un usuario
 */

export class User {

    constructor({avatar, balance, firstName, gender, id, isActive, lastName}){
      this.avatar = avatar 
      this.balance = balance
      this.firstName = firstName
      this.gender= gender
      this.id = id
      this.isActive = isActive 
      this.lastName = lastName
    }
}
~~~

- Quiero cambiar el snake_case por camelCase en first_name y last_name. Si lo hago directamente no va a hacer match con el objeto
- Para ello se introduce el concepto de un **mapper**
- Es un ente intermedio para saber como viene la data de mi backend y generar una instancia basado en lo que yo necesito

-----

## Mappers

- Creo el archivo src/users/mappers/localhost-user.mapper.js

~~~js
import { User } from "../models/user"



export const localhostUserToModel = (localhostUser)=>{


    return new User()
}
~~~

- En el cuerpo de la función desestructuro cada una de las propiedades que viene en el objeto
- En la nueva instancia de User hago el cambio de snakeCase a camelCase de first_name y last_name

~~~js
/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */

export const localhostUserToModel = (localhostUser)=>{

    const {avatar, balance, first_name, gender, id, isActive, last_name} = localhostUser


    return new User({
        avatar, 
        balance, 
        firstName: first_name, 
        gender, 
        id, 
        isActive, 
        lastName: last_name
    })
}
~~~

- Esto es un mapper. Una función que recibe el objeto o algo que luzca cómo ese objeto (User) y genera una instancia
- ¿Cómo usar el mapper?
- Voy a loadUserByPage que es donde tengo la data del fetch (es un arreglo) y la mapeo guardándolo en users.
- Esta función se llama en loadNextPage() que es llamada en usersApp
- Ahora si hago un console.log aparece firstName y lastName en consola

~~~js
export const loadUsersByPage = async (page= 1)=>{
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=2`

    const res = await fetch(url)
    const data = await res.json()

    const users = data.map(userLike => localhostUserToModel( userLike )) //al ser el único argumento igual que el parámetro, 
    console.log(users)                                                            //puedo dejar sólo la referencia a la función
}
~~~

- Esta función va a regresar una promesa (por eso el async) con un arreglo de User
- Importo User para que no de error con la documentación

~~~js
import { localhostUserToModel } from "../mappers/localhost-user.mapper"
import { User } from "../models/user"

/**
 * 
 * @param {Number} page
 * @returns {Promise <User[]>}
 */

export const loadUsersByPage = async (page= 1)=>{
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=2`

    const res = await fetch(url)
    const data = await res.json()

    const users = data.map(userLike => localhostUserToModel( userLike )) //al ser el único argumento igual que el parámetro, 
    
    return users//puedo dejar sólo la referencia a la función
}
~~~
----


## Actualizar el Store

- Este loadUsersByPage no actualiza el state
- Del state es de dónde quiero tomar la data
- En loadNextPage solo voy a cambiar el current page si hay usuarios en la respuesta
- Si voy a la página 20 y no hay usuarios no voy a ir a la 21
- Si si los hay, le sumo 1
- Actualizo el state de users con el resultado de la promesa

~~~js
const loadNextPage = async ()=>{
    const users = await loadUsersByPage(state.currentPage+1)
    if(users.length === 0) return;

    state.currentPage += 1
    state.users = users
}
~~~

- Ahora, desde cualquier lado de mi app yo puedo hacer un console.log(usersStore.getUsers()) y tengo la info 
----

# Crear una tabla HTML con los usuarios

- Creo en src/presentation/render-table/render-table.css y render-table.js
- Voy a crear una tabla HTML, pero como quiero guardar esta tabla en memoria, declaro la variable fuera del cuerpo de la función
- Solo las funciones que estén en este módulo van a poder acceder a ella

~~~js
import usersStore from '../../store/users-store';
import './render-table.css';

let table;

export const RenderTable = (element)=>{

    const users = usersStore.getUsers()

}
~~~

- Si no hay tabla la creo con la función 
- Porqué append? Porque no quiero destruir nada de lo que ya haya creado

~~~js
import usersStore from '../../store/users-store';
import './render-table.css';

let table;

const createTable = ()=>{
    const table = document.createElement('table')
    const tableHeaders= document.createElement('thead')
    tableHeaders.innerHTML=`
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `
    const tableBody = document.createElement('tbody')

    table.append(tableHeaders, tableBody)
    return table;
}



export const RenderTable = (element)=>{

    const users = usersStore.getUsers()

    if(!table){
        table = createTable()
        element.append(table)

        //TODO: listeners
    }
}
~~~

- Coloco la función de RenderTable en UsersApp
- RenderTable va con mayúsculas porque es un componente
- Ya no necesito el Loading, lo borro

~~~js
export const UsersApp = async(element)=>{
    element.innerHTML = 'Loading...'
    await usersStore.loadNextPage()
    element.innerHTML=""
    RenderTable(element)
}
~~~

- Por cierto, también se pueden documentar los objetos para que la ayuda sea mejor
- En el store:

~~~js
export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: ()=> [...state.users],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: ()=> state.currentPage
}
~~~

- Mapeo el user con un forEach
- Selecciono el tbody con un querySelector sobre el table y le concateno el tableHTML 


~~~js

export const RenderTable = (element)=>{

    const users = usersStore.getUsers()

    if(!table){
        table = createTable()
        element.append(table)

        //TODO: listeners
    }

    let tableHTML =''

    users.forEach(user =>{
        tableHTML +=`   
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive}</td>
                <td>
                    <a href="#/" data-id="${user.id}">Select</a>
                    |
                    <a href="#/" data-id="${user.id}">Delete</a>
                    
                </td>
            </tr>
        `
    })

    table.querySelector('tbody').innerHTML = tableHTML
}
~~~

----

## Botones Next, Prev y página actual





















