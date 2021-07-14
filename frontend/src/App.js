import React,{useState, useEffect} from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [artistName, setArtistName] = useState('');
  const [albumName, filterAlbums] = useState('');
  const [albums, setAlbums] = useState([]);

  function callApi(e){
    setArtistName(e.target.value);
    axios.get(`http://localhost:3000/api/albums/${artistName}`)
    .then(function(response){
      const albums =response.data.data.results;
      setAlbums(albums);
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function call(){
    axios.get('http://localhost:3000')
    .then(function(response){
      const albums =response.data.data.results;
      setAlbums(albums);
      console.log(albums);
    })
    .catch(function(error){
      console.log(error);
    })
  }

  useEffect(() => {
    call();
  }, []);
  
  return (
    
    <div className="App">
      <input
        placeholder="Type artist name to display all its albums"
        value={artistName}
        onChange={callApi}
      ></input>

      <br/>
      <input
        placeholder="Filter the currently displayed albums"
        value={albumName}
        onChange={(e)=>filterAlbums(e.target.value)}
      ></input>

      <h1>Searching for {artistName} albums...</h1>
      <h2>(this might take a few seconds)</h2>
      <div className="cards">
      
        {
          
              albums.filter((album)=>{
                if (albumName == "") {
                  return albums;
                } 
                else if (album.collectionName.includes(albumName)){
                  console.log(albumName);
                  return albums;
                }
              })
              .map((album)=>{
                return(
                  
                    <div className="card-item" key={album.collectionId} >
                      <h2>{album.collectionName}</h2>
                      <img src={album.artworkUrl100} alt=""/>
                    </div>
                
                )
                
              })
            
        }
      </div>
    </div>
  );
}

export default App;
