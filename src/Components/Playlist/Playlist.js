import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component {
  render() {
    return (
      <div>
        <div className="Playlist">
          <input value="New Playlist"/>
            <TrackList tracks={this.props.playlistTracks} />
          <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
        </div>
      </div>
    );
  }
}

export default Playlist;