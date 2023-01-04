import usersStore from  '../users/store/users-store'


/**
 * 
 * @param {HTMLDivElement} element 
 */

export const UsersApp = async(element)=>{
    element.innerHTML = 'Loading...'
    await usersStore.loadNextPage()

}