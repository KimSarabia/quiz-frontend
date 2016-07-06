angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('QuestionCtrl', function($scope, $http) {
  $scope.goAnswer = false;

  $scope.result = "";
  $http.get('http://historic-denali-preserve-77338.herokuapp.com/api/questions/')
    .success(function(data, status, headers,config){
      $scope.questions = data;
      console.log('first question:', data[0].questionTitle);  // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
      console.log('things:', things);
    });

    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500,
    }



    $scope.revealAnswer = function(val) {
        $scope.goAnswer = true;
    }

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      console.log('Slide change is beginning');

    });



    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      // note: the indexes are 0-based
      $scope.activeIndex = data.activeIndex;
      $scope.previousIndex = data.previousIndex;
    });

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
      // grab an instance of the slider
      $scope.slider = data.slider;
    });

    function dataChangeHandler(){
      // call this function when data changes, such as an HTTP request, etc
      if ( $scope.slider ){
        $scope.slider.updateLoop();
    }
}

})

.controller('CategoriesCtrl', function($scope) {
  $scope.categories = [
    { title: 'HTML', id: 1 },
    { title: 'CSS', id: 2 },
    { title: 'JavaScript', id: 3 }
  ];
})

.controller('CategoryCtrl', function($scope, $stateParams) {
  console.log('category controller');
});
