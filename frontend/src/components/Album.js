// import React,{useState, useEffect} from 'react';
// import axios from "axios";
// import "../index.css"
// const Album = () => {
//     const [allData,setAllData] = useState([]);
//     const [filteredData,setFilteredData] = useState(allData);
//     const search = (e) =>{

//     }
//     useEffect(() => {
//         axios('localhost/3000')
//         .then(response => {
//             console.log(response.data)
//             setAllData(response.data);
//             setFilteredData(response.data);
//             })
//         .catch(error => {
//             console.log('Error getting fake data: ' + error);
//         })
//     }, []);

//     return ( 
//         <div>
//         <input
//             placeholder="Type artist name"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//         ></input>
//             <div className="cards">
//             {albums
//                 .filter((album) => {
//                   if (inputValue == "") {
//                     return pokemons;
//                   } else if (
//                     pokemon.name.includes(inputValue.toLocaleLowerCase().trim())
//                   ) {
//                     return pokemons;
//                   }
//                 })
//                 .map((album) => {
//                   return <CardItem name={pokemon.name} sprite={pokemon.sprite} />;
//                 })}
//             </div>
//         </div>
//      );
// }
 
// export default Album;