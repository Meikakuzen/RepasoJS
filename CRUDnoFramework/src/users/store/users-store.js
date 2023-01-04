import {loadUsersByPage} from '../use-cases/load-users'


const state = {
    currentPage: 0,
    users: []
}

const loadNextPage = async ()=>{
    await loadUsersByPage(state.currentPage+1)
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