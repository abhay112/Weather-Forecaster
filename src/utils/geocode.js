const request = require('request');

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJoYXkxMTIiLCJhIjoiY2tyNjEwbGxjMjY5bzJxbGR4d2NoY2F4biJ9.f_XLjwKP7wMtaXEvCws88Q'
    request({ url: url, json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to location services',undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find location, Try another Location',undefined);
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                // console.log("latitude: "+ latitude + " longitude: "+ longitude)
                location:response.body.features[0].place_name
            });
        }
    });
}
module.exports = geocode;