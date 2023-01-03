import './style.css'
import javascriptLogo from './javascript.svg'
import { promisesComponent } from './src/concepts/03-promesas'
import { promiseRaceComponent } from './src/concepts/04-promise-race'

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

//environmentComponent(element)
//callbacksComponent(element)
//promisesComponent(element)
promiseRaceComponent(element)