// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, AccountService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  AccountService.currentUser()
  .then(function(user) {
    $rootScope.user = user;
  })
})

.constant("socialProvider", ["facebook","google"])

.constant('$ionicLoadingConfig', {
  template: "<ion-spinner></ion-spinner>",
  hideOnStateChange : false
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.carga', {
    url: '/cargaparqueo',
    views: {
      'menuContent': {
        templateUrl: 'templates/cargaparqueo.html',
        controller: 'CargaCtrl'
      }
    }
  })
  .state('app.mapa', {
    url: '/mapa',
    views: {
      'menuContent': {
        templateUrl: 'templates/mapa.html',
        controller: 'MapaCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/mapa');
})
.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&',
      initFunct: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        $scope.initFunct();
      }
      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
}).directive('onEnter', function() {
    return {
        restrict: "A",
        scope: {
            action: "&onEnter"
        },
        link: function(scope, element, attrs) {
            element.on("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(scope.action);
                    event.preventDefault();
                }
            });
        }
    };
});
