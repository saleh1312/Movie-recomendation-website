import requests as req
import json
import pickle
import numpy as np
from sqlalchemy import create_engine
import pandas as pd
from sqlalchemy.sql import text

class utils2:
    def __init__(self):

        self.engine = create_engine('mysql+pymysql://root:@localhost:3306/my_data')
        films_latent=pd.read_sql('SELECT * FROM films_latent',self.engine)
        self.films_names=films_latent['film'].tolist()
      
        
        self.geners={
                          28:"Action",
                     12:"Adventure",
                       16:"Animation",
                          35:"Comedy",
                           80:"Crime",
                     99:"Documentary",
                           18:"Drama",
                          10751:"Family",
                         14:"Fantasy",
                         36:"History",
                          27:"Horror",
                           10402:"Music",
                         9648:"Mystery",
                         10749:"Romance",
                 878:"Science Fiction",
                        10770:"TV Movie",
                        53:"Thriller",
                             10752:"War",
                         37:"Western",
        }
        
        
        
        self.api_base='https://api.themoviedb.org/3/'
        self.api_key='629a3b5110065881ab2ebb6832b1179e'
        self.api_method='search/movie'
      
        

    def get_all_films(self,films_names):
        
        films=[]
        nons=0
        for film in films_names:
            response = req.get(self.api_base+self.api_method,
                                    params={'api_key':self.api_key,
                                            'query':self.clean(film)})
            if not response.json()['results'] :
                films.append({'film':film,
                              'path':'none',
                              'geners':'none'})
                nons+=1
            
            for ele in response.json()['results']:
                gnrs=[]
                for gen in ele['genre_ids']:
                    gnrs.append(self.geners[gen])
                gnrs=",".join(gnrs)

                films.append({'film':film,
                              'path':
                                  'https://image.tmdb.org/t/p/w500'+ele['poster_path'] if ele['poster_path'] !=None else 'none',
                              'geners':gnrs})
                break
            
        
        df = pd.DataFrame(films,columns=['film','path','geners']) 

        try: #if exist delete it , if not pass the exception
            statement1 = text("""DROP TABLE film_data""")
            self.engine.execute(statement1)
        except:
            pass
        df.to_sql("film_data", con = self.engine,if_exists="replace",index=False)

        return df,nons
    def clean(self , name):
         n=name.split('_')
         nn=n[:-1] if len(n) <=3 else n[:-2]
         nnn=" ".join(nn)
         return nnn
            
    def main(self):
        films_data=self.get_all_films(self.films_names)
        return films_data


if __name__=="__main__":
    uu=utils2()
    films_data=uu.main()
    print(films_data[0])
    print('\n\n\\')
    print(films_data[1])
    #pickle.dump( films_data, open( "movies/films_images.p", "wb" ) )
    #print('finished')
    

    
    