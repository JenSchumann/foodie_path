console.log('foodie path is the right way');

const app = angular.module('FoodieApp', []);

////////////////////////////////////////////////////////////

//Foodie controller

////////////////////////////////////////////////////////////

app.controller('FoodieController', ['$http', function($http){
  const controller = this;
  this.foodie = "Where's the beef?";

}]); //end of FoodieController

////////////////////////////////////////////////////////////

//Profile controller

////////////////////////////////////////////////////////////


app.controller('ProfileController', ['$http', '$scope', function($http, $scope){
  const controller = this;
  this.persona = "As God is my witness, I will never be hungry again."

  this.toggleNew = function(){
    console.log('Do I look fat in this outfit?');
    this.newDisplay = !this.newDisplay;
  }




}]); //end of ProfileController
