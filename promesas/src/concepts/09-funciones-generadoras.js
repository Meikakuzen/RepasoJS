
/**
 * 
 * @param {HTMLDivElement} element 
 */


export const generatorFunctionsComponent = (element)=>{
    
    const myGenerator = myFirstGeneratorFunction();

   /* console.log(myGenerator.next()) //devuelve "Primer valor"
    console.log(myGenerator.next()) //devuelve "Segundo valor"
    console.log(myGenerator.next()) //devuelve "Tercer valor"
    console.log(myGenerator.next()) //devuelve "No hay más valores" y el done: true
    */
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


function* idGenerator(){
    let currentId = 0
    while(true){
        yield ++currentId
    }
}

function* myFirstGeneratorFunction(){

    yield "Primer valor"
    yield "Segundo valor"
    yield "Tercer valor"

    return "No hay más valores"
}