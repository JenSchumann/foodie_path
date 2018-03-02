console.log('foodie path is the right way');

const app = angular.module('FoodieApp', []);

////////////////////////////////////////////////////////////

//Foodie controller

////////////////////////////////////////////////////////////

app.controller('FoodieController', ['$http', function($http){
  const controller = this;
  this.foodie = "Where's the beef?";
  this.yelpDietLocations = [];


  this.getYelpResponse = function(){
    $http({
      method: 'POST',
      url: '/restaurants/getYelpResponse',

      data: {
        term: this.yelpDiet,
        location: this.yelpLocation
      }
    }).then(
      function(response){
        console.log('the button is working');
        for(let i = 0; i < (response.data).length; i++){
          response.data[i].name,
          response.data[i].rating,
          response.data[i].price,
          response.data[i].address1
        }

        controller.yelpRestaurants = response.data;
        controller.yelpLocation = '';
        controller.yelpDiet = '';
      },
      function(error){
        console.log(error);
      }
    )
  }

  this.getRestaurants =function(){

    $http({
      method: 'GET',
      url: '/restaurants'
    }).then(
      function(response){
        controller.restaurants=response.data

      },
      function(error){

      }
    )
  }
  this.getRestaurants();
}]); //end of FoodieController

////////////////////////////////////////////////////////////

//Profile controller

////////////////////////////////////////////////////////////


// app.controller('ProfileController', ['$http', '$scope', function($http, $scope){
//   const controller = this;
//   this.persona = "As God is my witness, I will never be hungry again.";
//   this.currentProfile = {};
//   this.yelpDietLocations = [];
//
//   this.toggleNew = function(){
//     console.log('Do I look fat in this outfit?');
//     this.newDisplay = !this.newDisplay;
//   }
//
//   this.createProfile = function(){
//     console.log('create profile being accessed');
//     $http({
//       method: 'POST',
//       url: '/profile',
//       data: {
//         author: this.author,
//         email: this.email,
//         avatar: this.avatar,
//         alias: this.alias,
//         headline: this.headline,
//         bio: this.bio,
//         dietPreference: this.dietPreference,
//         files: this.files,
//         tasks: this.tasks,
//         favoriteRecipes: this.favoriteRecipes,
//         favoriteRestaurants: this.favoriteRestaurants,
//         comments: this.comments
//       }
//     }).then(function(response){
//       controller.newDisplay = false;
//       controller.getProfiles();
//       console.log('profile was successfully created');
//       console.log(response);
//     }, function(err){
//       console.log(err)
//       console.log('error in createProfile');
//     });
//   }
//
//   this.getProfiles = function(){
//     console.log('getting profiles');
//     $http({
//       method: 'GET',
//       url: '/profile',
//     }).then(function(response){
//       controller.allProfiles = response.data;
//       console.log(response);
//     }, function(error){
//       console.log('error in getProfiles');
//       console.log(error);
//     });
//   };
//
//   this.setCurrentProfile = function(id){  //grabbing it by id so it can //be edited in next function
//     $http({
//       method: 'GET',
//         url: '/profile/' + id
//     }).then(function(response){
//         controller.currentProfile = response.data[0];
//         console.log(controller.currentProfile);
//         console.log(response);
//         // $scope.input = '';
//         // if($scope.verify.username !== controller.currentProfile.author) {
//         //   document.getElementById("profileItem").style.visibility = "hidden";
//         // }
//     }, function(error){
//       console.log(error);
//       console.log('error in setCurrentProfile');
//     })
//   }

  // getrequest to YELP============================


  // Yelp Response =========================
    // this.getYelpResponse = function(){
    //   $http({
    //     method: 'POST',
    //     url: '/restaurants/',
    //     // https://api.yelp.com/v3/businesses/search
    //     data: {
    //       location: this.yelpLocation
    //     }
    //   }).then(
    //     function(response){
    //       console.log('the button is working');
    //       // for(let i = 0; i < (response.data).length; i++){
    //       //   response.data[i].name,
    //       //   response.data[i].rating,
    //       //   response.data[i].price,
    //       //   response.data[i].address1
    //       // }
    //
    //       controller.yelpDietLocations = response.data;
    //       controller.yelpLocation = '';
    //     },
    //     function(error){
    //       console.log(error);
    //     }
    //   )
    // }


// }]); //end of ProfileController
