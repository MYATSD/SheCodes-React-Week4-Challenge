import React, { useState } from 'react'
import axios from 'axios'
import  { Search } from 'react-bootstrap-icons';


const Weather = () => {
    const [temp ,setTemp] = useState('5')
    const [description,setDescription] = useState('Clear Sky')
    const [humidity , setHumidity] = useState(88)
    const [icon , setIcon] = useState('01d')
    const [windSpeed, setWindSpeed] = useState('1.54')
    const [city,setCity] = useState("Paris")
    const [weeklyData,setWeeklyData] = useState([{temp:{min:6,max:9}},{temp:{min:5,max:9}},{temp:{min:5,max:9}},{temp:{min:4,max:9}},{temp:{min:6,max:9}}])
   
    
    const dt = new Date(Date.now())
    const Days = ['Sunday','Monday' , 'Tuesday', 'Wednesday' , 'Thursday' , 'Friday','Saturday' ]

    const today = Days[dt.getDay()]
    const todayWeather = (response) =>{
        console.log(response.data.weather[0].description)
        setTemp(Math.round(response.data.main.temp))
         setDescription(response.data.weather[0].description)
         setHumidity(response.data.main.humidity)
         setIcon(response.data.weather[0].icon)
         setWindSpeed(response.data.wind.speed)

        const lat = response.data.coord.lat
        const lon = response.data.coord.lon
      forecast(lat,lon)
     
     
    }
  const forecast = (lat,lon) =>{
    const forecastId = '58a6775f97527351bf6c6966e209be39'
    console.log(lat)
    const forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude={part}&appid=${forecastId}`
    axios.get(forecastApi).then(weeklyForecast)
  }
  const weeklyForecast= (response)=>{
 setWeeklyData(response.data.daily)
    
  console.log(response)

  }
  console.log(weeklyData)

   const formHandler= (event) =>{
    event.preventDefault()
    const Appid = 'f6c2990f3929b0780a59af13d1fba8f9'
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Appid}`

    axios.get(api).then(todayWeather)
    


   }


  return (
    
   <div>
     <div className='row container border m-5 bg-light mx-auto' style={{width: "800px"}}>
         
         <div>
             <form onSubmit={formHandler} className='d-flex justify-content-start align-items-center'>
                <input type='text' placeholder='Enter a City' className='mt-3  ' onChange={(e)=>setCity(e.target.value)}/>
               <button className='btn-sm btn-light mt-3'> <Search/></button>
                
             </form>
         </div>
          <div className='row mt-4'>
             <div className='col-6 '>
                 <h1 className='text-transform-capitalize'>{city.toUpperCase()}</h1>
                 <h3 className=''>{today}</h3>
           
                 <ul>
                     <li>Humidity : {humidity}%</li>
                     <li>Wind Speed :{windSpeed}km/h</li>
                 </ul>
             
            
             </div>
             <div className='col-6 text-center '>
                 <h1>{temp}°C</h1>
                 <div>
                 <p className='mb-0 text-transform-capitalize'>{description}</p>
 
                 <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} style={{width: 100+ "px"}} />
                 
                 </div>
             </div>
         
            
          </div>
 
          <div className='d-flex  justify-content-between align-items-center gutter-0 gap-2 mb-2 '>
         
           {weeklyData.map((d,index) =>{
            
            if(index<5){
             return(
               <div className='row  ' >
             
                <p>{Days[index +1]}</p>
                <p>{Math.round(d.temp.min)}°C</p>
                <p>{Math.round(d.temp.max)}°C</p>
               
                
  
             
             </div>
             )
            }
             }) }
  
 
           
          </div>
      
     </div>
     <div className='mx-auto' style={{width: "800px"}}>
      <p className='text-center'>
      <a href='https://github.com/MYATSD' >Open Source Code</a> by Hsu Myat Sandi Aung

      </p>
     </div>
   </div>
    
  )
}

export default Weather