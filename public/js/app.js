console.log('foodie path is the right way');

const app = angular.module('FoodieApp', []);

////////////////////////////////////////////////////////////

//Foodie controller

////////////////////////////////////////////////////////////

app.controller('FoodieController', ['$http', function($http){
  const controller = this;
  this.foodie = "Where's the beef?";
  this.modal = false;
  this.aboutModal = false;
  this.toggleModal = function() {
    this.modal = !this.modal;
    this.aboutModal = !this.aboutModal;
    console.log('foodieController working');
  }
}]); //end of FoodieController

////////////////////////////////////////////////////////////

//User controller

////////////////////////////////////////////////////////////

app.controller('UserController', ['$http', '$scope', function($http, $scope) {
  const controller = this;
  this.modal = false;
  this.loggedIn = false;
  this.loginForm = true;
  this.registerForm = false;
  this.newDisplay = false;
  this.currentUser = {};

  this.toggleNew = function(){
    this.newDisplay = !this.newDisplay;
    this.reset = function() {
      this.addForm.reset();
    }
  }
  this.toggleModal = function() {
    this.modal = !this.modal;
  };
  this.toggleForms = function() {
    this.registerForm = !this.registerForm;
    this.loginForm = !this.loginForm;
  };
  this.register = function(email, username) {
    $http({
      method: 'POST',
      url: '/users/register',
      data: {
        username: this.registeredUsername,
        password: this.registeredPassword
      }
    }).then(function(response) {
      controller.loggedIn = response.data;
      controller.registerForm = false;
      console.log('new foodie created');
    }, function(err) {
      console.log(err);
    });
  };
  this.goToRegister = function() {
    this.registerForm = true;
    this.loginForm = false;
  };
  this.goToLogin = function() {
    this.loginForm = true;
    this.registerForm = false;
  };
  this.login = function(username, password) {
    $http({
      method: 'POST',
      url: '/users/login',
      data: {
        username: this.loginUsername,
        password: this.loginPassword
      }
    }).then(function(response) {
      if(response.data === true) {
        controller.loginForm = false;
        controller.loggedIn = response.data;
        controller.verifyLogin();
        console.log('verified user is logged in');
      } else {
        controller.message = response.data
      };
    }, function(err) {
      console.log(err);
    });
  };
  this.logOut = function() {
    $http({
      method: 'GET',
      url: '/users/logout'
    }).then(function(response) {
      controller.loggedIn = response.data;
      controller.loginForm = true;
      controller.username = {};
      console.log('user logged out');
    });
  };
  this.getUsers = function() {
    $http({
      method: 'GET',
      url: '/users'
    }).then(function(response) {
      controller.allUsers = response.data;
    }, function(err) {
      console.log(err);
    });
  };
  this.verifyLogin = function() {
    $http({
      method: 'GET',
      url: 'users/verifyLogin'
    }).then(function(response) {
      $scope.verifyFoodie = response.data;
    }, function(err) {
      console.log(err);
    });
  };
  this.setCurrentUser = function(id) {
    $http({
      method: 'GET',
      url: '/users/' + id
    }).then(function(response) {
      controller.currentUser = response.data[0]
      $scope.input = '';
    }, function(err) {
      console.log(err);
    });
  };
  this.updateUser = function(id) {
    console.log('works');
    $http({
      method: 'PUT',
      url: '/users/' + id.allUsers._id,
      data: this.editedUser
    }).then(function(response) {
      controller.getUsers();
      controller.currentUser = {};
      controller.user = {};
      controller.editedUser = {};
    }, function(err) {
      console.log(err);
    });
  };
  this.deleteUser = function(user) {
    $http({
      method: 'DELETE',
      url: '/users/' + user,
    }).then(function(response) {
      controller.getUsers();
      controller.modal = false;
      controller.logOut();
    }, function(err) {
      console.log('user delete route error');
      console.log(err);
    });
  };
  this.getUsers();
}]);
// end of usersController

////////////////////////////////////////////////////////////

//Profile controller

////////////////////////////////////////////////////////////


app.controller('ProfileController', ['$http', '$scope', function($http, $scope){
  const controller = this;
  this.persona = "As God is my witness, I will never be hungry again.";
  this.currentProfile = {};

  this.toggleNew = function(){
    console.log('Do I look fat in this outfit?');
    this.newDisplay = !this.newDisplay;
  }

  this.createProfile = function(){
    console.log('create profile being accessed');
    $http({
      method: 'POST',
      url: '/profile',
      data: {
        author: this.author,
        email: this.email,
        avatar: this.avatar,
        alias: this.alias,
        headline: this.headline,
        bio: this.bio,
        dietPreference: this.dietPreference,
        files: this.files,
        tasks: this.tasks,
        favoriteRecipes: this.favoriteRecipes,
        favoriteRestaurants: this.favoriteRestaurants,
        comments: this.comments
      }
    }).then(function(response){
      controller.newDisplay = false;
      controller.getProfiles();
      console.log('profile was successfully created');
      console.log(response);
    }, function(err){
      console.log(err)
      console.log('error in createProfile');
    });
  }

  this.getProfiles = function(){
    console.log('getting profiles');
    $http({
      method: 'GET',
      url: '/profile',
    }).then(function(response){
      controller.allProfiles = response.data;
      console.log(response);
    }, function(error){
      console.log('error in getProfiles');
      console.log(error);
    });
  };

  this.setCurrentProfile = function(id){  //grabbing it by id so it can //be edited in next function
    $http({
      method: 'GET',
        url: '/profile/' + id
    }).then(function(response){
        controller.currentProfile = response.data[0];
        console.log(controller.currentProfile);
        console.log(response);
        // $scope.input = '';
        // if($scope.verify.username !== controller.currentProfile.author) {
        //   document.getElementById("profileItem").style.visibility = "hidden";
        // }
    }, function(error){
      console.log(error);
      console.log('error in setCurrentProfile');
    })
  }




}]); //end of ProfileController
