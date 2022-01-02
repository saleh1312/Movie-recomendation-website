// {name:"sadsa",rate:2}
const ratingsreduser =(state=[],action)=>
    {
    switch (action.type) {
        case "rate":
            let my_rate_films = [...state];
            
            for(let i =0;i<action.value.length;i++){
                let exist=false;
                let index=0;
                for(let j =0;j<my_rate_films.length;j++){

                  if (action.value[i].name===my_rate_films[j].name){
                    exist=true;
                    index=j;
                    break;
                  }

                }
                if (exist){
                    my_rate_films[index].rate=action.value[i].rate;
                }else{
                    my_rate_films.push(action.value[i])
                }

              }
        
            
            return my_rate_films
    
        case "remove_rate":
            return state.filter(film=>film.name !==action.value[0].name);
   
        default:
            return state;
    }

}
export default ratingsreduser;