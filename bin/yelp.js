'use strict';

const yelp = require('yelp-fusion');

// const apiKey ='-2nsGNuxN6hJzerJ_eMXNU40hvpJWRiIL_d3SPt7w4oG_VpYbs3aGSrb868vf7pET6LbyvY7l30g_GQrx2LXNl-ivr8UOJAx31sbVJAEW_uoI6v6c3deVOVXVLqQWnYx';

const apiKey = process.env.API_KEY;

const client = yelp.client(apiKey);


const getYelpResponse = (res, term, body) => {

let yelpResponse = [];

client.search({
  term: term,
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
