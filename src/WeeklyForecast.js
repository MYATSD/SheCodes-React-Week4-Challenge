import React from 'react'

const WeeklyForecast = ({minTemp,maxTemp,index}) => {
    const Days = ['Sunday','Monday' , 'Tuesday', 'Wednesday' , 'Thursday' , 'Friday','Saturday' ]

    
  
           if(index<5){
             return(
               <div className='row  ' >
             
                <p>{Days[index +1]}</p>
                <p>{Math.round(minTemp)}°C</p>
                <p>{Math.round(maxTemp)}°C</p>
                </div>
                
  
           
             )
            }          }
                    

  
 

export default WeeklyForecast