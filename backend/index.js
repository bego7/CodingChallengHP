const express= require('express');

const app = express();

const fetch   = require('node-fetch');


cors = require("cors");
app.use(cors());


// general route
app.get('/', (req,res)=>{
    let url ="https://itunes.apple.com/search?term=adele&entity=album"
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

// route to get all albums for a given artist
app.get('/api/albums/:artist', (req,res)=>{

    if(!req.params){
        return res.send("NO PARAMS PASSED")
    }
    

    if(!req.params.artist){
        return res.send("No artist was passed")
    }
    
    if(req.params.artist === ""){
        return res.send("Artist is empty")
    } 
    else {
        let url = `https://itunes.apple.com/search?term=${req.params.artist}&entity=album`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            res.send(err);
        });
    }
    
});



const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

module.exports= app;