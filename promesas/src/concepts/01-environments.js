
/**
 * 
 * @param {HTMLDivElement} element 
 */


export const environmentsComponent = (element)=>{
    
    console.log(import.meta.env)

    const html = `
        Dev: ${import.meta.env.DEV} </br>
        Url: ${import.meta.env.VITE_BASE_URL}
    `;
    element.innerHTML = html
}