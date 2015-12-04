// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',
	[
		'ionic',
		'app.controllers',
		'app.services',
		'user.controllers',
		'user.services'
	]
)
/**
 * see documentation: https://www.parse.com/apps/quickstart#parse_data/web/existing
 * parse constants
 */
	.value('ParseConfiguration', {
		applicationId: "ZRYdicNbaWchGApCAXj4iU3dXmbmLvEmMs8YEFEK",
		javascriptKey: "rjc0stBqHTeeZ4trKzfWHksNsliMOXH10ZHWCliU"
	})
/**
 *
 */
	.config(function($stateProvider, $urlRouterProvider) {
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider
			// create account state
		.state('app.signup', {
			url: "/signup",
			templateUrl: "templates/user/signup.html",
			controller: "SignUpController"
		})
		// login state that is needed to log the user in after logout
		// or if there is no user object available
		.state('app.login', {
			url: "/login",
			templateUrl: "templates/user/login.html",
			controller: "LoginController"
		})

		// setup an abstract state for the tabs directive, check for a user
		// object here is the resolve, if there is no user then redirect the
		// user back to login state on the changeStateError
		.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				resolve: {
				user: function (UserService) {
					var value = UserService.init();
					console.log('got to reseolve')
					
					return value;
				}
			}
		})
		.state('app.abilities', {
			url: '/abilities',
			views: {
				'menuContent': {
					templateUrl: 'templates/abilities.html',
					controller: 'AbilitiesCtrl'
				}
			}
		})

		.state('app.money', {
			url: '/money',
			views:{
				'menuContent':{
				templateUrl: 'templates/money.html',
				controller: 'MoneyCtrl'
				}
			}
		})

		.state('app.feats', {
				url: '/feats',
				views: {
					'menuContent': {
							templateUrl: 'templates/feats.html',
							controller: 'FeatsCtrl'
					}
				}
		})

		.state('app.character', {
				url: '/character',
				views: {
					'menuContent': {
							templateUrl: 'templates/character.html',
							controller: 'CharacterCtrl'
					}
				}
		});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/abilities');
	})
	.run(function($ionicPlatform, $rootScope, $state) {

			$rootScope.$on('$stateChangeError',
			function (event, toState, toParams, fromState, fromParams, error) {

				debugger;

				console.log('$stateChangeError ' + error && (error.debug || error.message || error));

				// if the error is "noUser" the go to login state
				if (error && error.error === "noUser") {
					event.preventDefault();

					$state.go('app.login', {});
				}
			});

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
	})
