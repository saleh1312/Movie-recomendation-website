import numpy as np
import tensorflow as tf
import math
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from scipy.spatial import distance






class my_recomender:
    def __init__(self):
        pass
    def get_similar_user(self,theta,thetas):
        
        sim_usrs={}
        for idd,latent in thetas.items():
            sim=distance.cosine(theta.astype(np.double),latent.astype(np.double))
            sim_usrs[idd]=sim
            
        sorted_sem=dict(sorted(sim_usrs.items(), key=lambda item: item[1]))
                
        
        return list(sorted_sem.keys())[:2]
        
    def get_thita(self,thetas_films,rates):
        films=tf.Variable(thetas_films.astype(np.float32))
        rates=tf.Variable(rates.astype(np.float32))
    
        user=tf.Variable(np.random.uniform(low=0.0, high=1.0
                                      , size=(rates.shape[0],films.shape[0])
                                      ).astype(np.float32))
        
        opt1 = tf.keras.optimizers.Adam(learning_rate=0.001)
    
        loss=tf.keras.losses.MeanSquaredError()
        
        def lossFunc(y_pred):
            l=loss(rates,y_pred)
            return l
        
        for e in range(5000):
            with tf.GradientTape() as tapef:
                y_pred=tf.matmul(user,films)
                l=lossFunc(y_pred)
            gf=tapef.gradient(l,user)
            opt1.apply_gradients([(gf, user)])
            
    
        return user.numpy()
    
    def recomend(self,ratese):
        with create_engine('mysql+pymysql://root:@localhost:3306/my_data').connect() as con:
            
            query="SELECT * FROM films_latent WHERE"
            rate=[]
            for film,ratee in ratese.items():
                query=query+f" film='{film}' or"
                rate.append(ratee)
                
            query=query[:-2]
                
            data=con.execute(query).fetchall()
            films_latent = [ [r[1],r[2],r[3],r[4],r[5],r[6]] for r in data]
            
            thetas=np.array(films_latent)
            rates=np.array(rate)
            thetas=thetas.reshape((thetas.shape[1],thetas.shape[0]))
            rates=rates.reshape((1,rates.shape[0]))
            
            user_theta=self.get_thita(thetas,rates)
            
            
            data=con.execute("SELECT * FROM users_latent").fetchall()
            users_thetas = { r[0]:np.array([r[1],r[2],r[3],r[4],r[5],r[6]]) for r in data}
            sim_id=self.get_similar_user(user_theta,users_thetas)
            
            query="DESCRIBE pivot"
            data=con.execute(query).fetchall()
            col_names=[r[0] for r in data]
            
            
            query=f"SELECT * FROM pivot WHERE user_id={sim_id[0]} or user_id={sim_id[1]}"
            data=con.execute(query).fetchall()
            sim_users = [ r for r in data]
            
            
            recos=[]
            my_retse=list(ratese.keys())
            for film_rate in range(1,len(sim_users[0]),1):
                f1=(sim_users[0][film_rate])
                f2=(sim_users[1][film_rate])
                if  (f1 is not None and f1>3) and (f2 is not None and f2>3):
                    filmName=col_names[film_rate]
                    if filmName not in my_retse:
                        recos.append(filmName)
               
            return recos,[sim_users[0][0],sim_users[1][0]]

        
if __name__ =="__main__":
        
    my_reco=my_recomender()
        
    my_recos,sim_user=my_reco.recomend(ratese={
                'Silence_of_the_Lambs_The_1991':5, 
               'Contact_1997':5, 
               'Titanic_1997':3, 
               'Scream_1996':1,
               'Toy_Story_1995':5,
               
               })
    print(my_recos)
    print("")
    print(sim_user)
    
        
        
    