'use strict';

const yelp = require('yelp-fusion');

const apiKey = process.env.API_KEY;

const client = yelp.client(apiKey);


const getYelpResponse = (res, term, body) => {

let yelpResponse = [];

client.search({
  term: body.term,
  location: body.location
}).then(response => {
  for(let i = 0; i < (response.jsonBody.businesses).length; i++) {
    yelpResponse.push(
    {
      name: response.jsonBody.businesses[i].name, rating: response.jsonBody.businesses[i].rating, price: response.jsonBody.businesses[i].price, address1: response.jsonBody.businesses[i].location.address1}
        )
      }
      console.log(yelpResponse);
      res.send(yelpResponse)
        }).catch(e => {
          console.log(e);
        });

}

module.exports = getYelpResponse;
