import React, { Component } from 'react';
import Axios from 'axios';

class MusicCard extends Component {
    constructor(props){
        super(props);
        this.state = { 
            spotifyURI: ""
        }
    
      }
    componentDidMount(){
        Axios.get(`http://localhost:3001/artists/${this.props.artist}`).then(response => {
            console.log(response);
            return response;
        })
        .then(response => {
            let uri = response.data.uri;
            this.setState({spotifyURI: uri});
        })
    }
    render() {
        let url = `${this.props.image}`
        let tourDates = this.props.dates.map((tourDate) => {
            return  (<li className="collection-item"><div>{tourDate}</div></li>)
        })
        let spotifyURL = `https://open.spotify.com/embed?uri=${this.state.spotifyURI}`;
        return (
            <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={url} />
            </div>
            <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{ this.props.title }<i className="material-icons right">more_vert</i></span>
            <p><a href="#">This is a link</a></p>
            </div>
            <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{this.props.title} <i className="material-icons right">close</i></span>
            <ul className="collection with-header">
                <li className="collection-header"><h4>Tour Dates</h4></li>
                <h3> <a href={this.props.url} >Buy Tickets to see { this.props.artist }</a> </h3>
            {tourDates}
            </ul>
            <iframe src={spotifyURL} 
                width="300" height="380" frameorder="0" allowtransparency="true" 
                allow="encrypted-media"></iframe>
            </div>
        </div>
                    
    )
  }
}

export default MusicCard;
