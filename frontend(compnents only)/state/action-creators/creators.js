export const add_films= (films)=>{
    return (dispatch) =>{
        dispatch({type:"add",value:films})
    }
}
export const remove_films= (films)=>{
    return (dispatch) =>{
        dispatch({type:"remove",value:films})
    }
}

