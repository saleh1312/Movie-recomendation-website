

/* const default_state=[
    {name:"matab_1422",img:"https://media.istockphoto.com/photos/panorama-of-cairo-picture-id1180786967",
    genrs:["Action"],rate:0,reco:false},
    {name:"pyramids_1222",img:"https://media.istockphoto.com/photos/the-mosquemadrassa-of-sultan-hassan-and-the-pyramids-in-the-cairo-picture-id1147133003",
    genrs:["Comedy"],rate:0,reco:false},
    {name:"pss_1222",img:"https://media.istockphoto.com/photos/pyramids-egypt-picture-id96318973",
    genrs:["Crime"],rate:0,reco:false},
]; */

const default_state=[]

const filmreduser =(state=default_state,action)=>
    {
    switch (action.type) {
        
        
        case "add":
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
              
                    my_rate_films[index].reco=action.value[i].reco;
                
                    
                    
                }else{
                    my_rate_films.push(action.value[i])
                }

              }
        
            
            return my_rate_films
    
        case "remove":
            return state.filter(film=>film.name !==action.value[0].name)
   
        default:
            return state;
    }

}
export default filmreduser;