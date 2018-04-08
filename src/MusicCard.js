import React, { Component } from 'react';
import Axios from 'axios';

class MusicCard extends Component {
    constructor(props){
        super(props);
        this.state = { 
            spotifyURI: "",
            imageURL: "",
        }
    
      }
    componentDidMount(){
        Axios.get(`http://localhost:3001/artists/${this.props.artist}`).then(response => {
            console.log(response);
            return response;
        })
        .then(response => {
            let uri = response.data.uri;
            let imageURL = response.data.images[0].url;
            this.setState({spotifyURI: uri});
            this.setState({imageURL: imageURL});
        })
    }
    render() {
        let tourDates = this.props.dates.map((tourDate) => {
            return  (<li className="collection-item"><div>{tourDate}</div></li>)
        })
        let spotifyURL = `https://open.spotify.com/embed?uri=${this.state.spotifyURI}`;
        return (
            <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.state.imageURL} />
            </div>
            <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{ this.props.title }<i className="material-icons right">more_vert</i></span>
            <p><a href="#">Details</a></p>
            </div>
            <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{this.props.title} <i className="material-icons right">close</i></span>
            <ul className="collection with-header">
                <li className="collection-header"><h4>Tour Dates</h4></li>
                <p> <a href={this.props.url} >Buy Tickets to see { this.props.artist }</a> </p>
            {tourDates}
            </ul>
            {/* <div className="video-container"> */}
            <iframe src={spotifyURL} 
                width="100%" height="100%" frameorder="0" allowtransparency="true" 
                allow="encrypted-media"></iframe>
            </div>
            {/* </div> */}
        </div>
                    
    )
  }
}

export default MusicCard;
