const clientId = 'e91a6d8005394de996df00744fd8beb6';
var accessToken;
var expiresIn;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        let url = window.location.href;
        accessToken = this.extract(url, "access_token=", "&");
        if (accessToken) {
            expiresIn = this.extract(url, "expires_in=", "&");
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=http://localhost:3000&state=4321`;
        }
    },
    extract(string, keyword, limiter) {
        let startIndex = string.indexOf(keyword);
        if (startIndex !== -1) {
            startIndex += keyword.length;
            let endIndex = string.indexOf(limiter, startIndex);
            if (endIndex !== -1) {
                return string.slice(startIndex, endIndex);
            } else {
                return string.slice(startIndex);
            }
        }
        return undefined;
    },
    search(term) {
        this.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }   
        }).then(response => {
            return response.json();
        }).then(music => {
            return music.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }))
        })
    },
    savePlaylist(list,name) {
        if(!list && !name){
            return;
        } else {
            let userId;
            let jsonBody = JSON.stringify({name: 'my playlist', public: false});
            return fetch(`https://api.spotify.com/v1/me`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }   
            }).then(response => {
                return response.json();
            }).then(music => {
                userId = music.id;
                this.getPlaylistID(userId,list);
            });
        }
    },
    getPlaylistID(userId,list){
        let jsonBody = JSON.stringify({name: 'my playlist', public: false});
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                method: 'POST',
                body: jsonBody,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                }).then(response => {
                    return response.json();
                }).then(useroneid => {
                    let playListIDD = useroneid.id;
                    this.newPlaylistID(playListIDD,list,userId);
                })
    },
    newPlaylistID(playlistIDD,list,userId){
        const uri = list.map(uris => {
           return uris.uri
        });
        let theBody = JSON.stringify(uri);
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistIDD}/tracks`,{
            method: 'POST',
            body: theBody,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(snapshotid => {
            console.log('The snapshot ID',snapshotid);
        })
    }
}

export default Spotify;
