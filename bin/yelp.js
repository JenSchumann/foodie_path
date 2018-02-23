'use strict';

const apiKey = process.env.API_KEY


const yelp = require('yelp-fusion');



const client = yelp.client(apiKey);

// const client = yelp.client(apiKey);


const getYelpResponse = (res, term, body) => {

  let yelpResponse = [];

        client.search({
          term: term,
          location: body.location
        }).then(response => {
          console.log(response.jsonBody.businesses[0].name);
        }).catch(e => {
          console.log(e);
        });

}

module.exports = getYelpResponse;
