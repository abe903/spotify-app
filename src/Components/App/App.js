import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({SearchResults: tracks});
    });
  }

  savePlaylist() {
    let list = this.state.playlistTracks;
    let name = this.state.playlistName;
    Spotify.savePlaylist(list,name);
    let newState = [];
    this.state.playlistName='New Playlist'
    this.setState({SearchResults: newState});
    this.setState({playlistTracks: newState});
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.state.playlistTracks.push(track);
      let newState = this.state.playlistTracks;
      return this.setState({playlistTracks: newState});
    }
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing App</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search} 
          />
          <div className="App-playlist">
            <SearchResults
              onSearch={this.search} 
              searchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
