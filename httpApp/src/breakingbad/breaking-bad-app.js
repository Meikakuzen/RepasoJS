


const fetchQuote = async () =>{
    
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    const data = await response.json()

    

    return data
} 


/**
 * 
 * @param {HTMLDivElement} element 
 */

export const BreakingBadApp = async (element)=>{

    document.querySelector('#app-tittle').innerHTML = "Breaking Bad App"
    element.innerHTML = "Loading..."

    const {abilities, moves, species} = await fetchQuote()
    
    element.innerHTML= JSON.stringify(abilities[0].ability.name)  
}