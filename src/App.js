import React, { Component } from 'react';
import MusicCard from './MusicCard';
import './App.css';
import Axios from 'axios';
// import idb from 'idb';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      musicEvents : [],
      musicCards : [],
    }

  }
  openDB(){

  }
  getUserLocation(){
        navigator.geolocation.getCurrentPosition(this.getNearbyConcerts);
  }
  getNearbyConcerts =  (currentLocation) => {
    let long = currentLocation.coords.longitude;
    let lat = currentLocation.coords.latitude;
    let tours = {};
    Axios.get(`http://localhost:3001/proxy/${lat}/${long}`)
    .then(json => {
      json.data.forEach(event => {
        if(!tours[event.name]){
          tours[event.name] = [];
        }
        tours[event.name].push({"date": event.dates.start.localDate,
        "image": event.images[1].url, "artist": event._embedded.attractions[0].name
      });
        
      });
      return tours;
    })
    .then(tours => {
      let cards = [];
      Object.keys(tours).forEach((key) => {
        let dates = tours[key].map((tour) => {
          return tour.date;
        });
        cards.push(<MusicCard title={key} url={ tours[key][0].url } image={ tours[key][0].image } dates={dates} artist={tours[key][0].artist }/>)
      })
      return cards;
    })
    .then(cards => {
      this.setState({musicCards: cards});
    })
  }

    
  componentDidMount(){
    this.getUserLocation();

  }
  render() {

    return (
      <div className="App">
       { this.state.musicCards }
      </div>
    );
  }
}

export default App;
