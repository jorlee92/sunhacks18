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
      console.log(json);
      json.data.forEach(event => {
        if(!tours[event.name]){
          tours[event.name] = [];
        }
        tours[event.name].push({"date": event.dates.start.localDate,
        "image": event.images[1].url, "artist": event._embedded.attractions[0].name, "url": event.url
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
      <div>
    <div class="navbar-fixed">
      <nav>
      <div className="nav-wrapper">
        <ul id="nav-mobile" className="right">
          <li><a href="#">Top</a></li>
          <li><a href="mailto:jorlee92@gmial.com">email us</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </div>
    </nav>
    </div>
      <div className ="container">
        <div className="row">
          <div className="App">
          <div className="col s10 offset-s1">
          { this.state.musicCards }
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
