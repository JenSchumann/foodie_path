console.log('foodie path is the right way');

const app = angular.module('FoodieApp', []);

////////////////////////////////////////////////////////////

//Foodie controller

////////////////////////////////////////////////////////////

app.controller('FoodieController', ['$http', function($http){
  const controller = this;
  this.foodie = "Where's the beef?";

}]); //end of FoodieController
