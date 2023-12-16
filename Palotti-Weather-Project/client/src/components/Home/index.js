import {Component} from 'react'
import {TailSpin} from "react-loader-spinner";

import WeatherCard from '../WeatherCard'
import NavBar from '../Navbar'
import Footer from '../Footer'

import './index.css'

class Home extends Component{

    state = {userInput:"nagpur",weatherList:[],isLoading: false}

    getWeatherReport = async()=>{
        const {userInput} = this.state
        this.setState({isLoading:true})
        console.log(userInput)
        const url = `https://api.tomorrow.io/v4/weather/forecast?location=india/${userInput}&apikey=KtLOuz5dI3XtUdaYYcqGQNr17E2Bf1Ek`
        const response = await fetch(url)
        const data = await response.json()
        if(response.ok===true){
            this.setState({weatherList:data.timelines.daily,isLoading: false})
        }
    }
    onChangeCity = (event)=>{
        this.setState({userInput:event.target.value})
    }

    render(){
        const {userInput,weatherList,isLoading} = this.state
    return (
        <>
        <NavBar/>
            <div className='home-bg-container'>
                <div className='input-btn-container'>
                <input id='userInput' className='input-user' type="search" value={userInput} onChange={this.onChangeCity}/>
            <button className='search-btn' type="button" onClick={this.getWeatherReport}>
                Search
            </button>
            </div>
            {isLoading?(
                <TailSpin/>
            ):(
                <div className='weather-card-container'>
                <ul className='unorder-list-container'>
                    {weatherList.map(each=> 
                        <WeatherCard key={each.time} weatherItems={each}/>
                    )}
                </ul>
            </div>
            )}
        </div>
        <Footer/>
        </>
    )
    }
}


export default Home