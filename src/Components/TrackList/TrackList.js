import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(songs => {
           return <Track 
            track={songs} 
            key={songs.id} 
            onAdd={this.props.onAdd}
           />
          })
        }
      </div>
    );
  }
}

export default TrackList;