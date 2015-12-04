angular.module('app.controllers', [])

	.controller('AbilitiesCtrl', [
		'$state', '$scope', 'UserService',   // <-- controller dependencies
		function ($state, $scope, UserService) {

			$scope.doLogoutAction = function () {
				UserService.logout().then(function () {

					// transition to next state
					$state.go('app.login');

				}, function (_error) {
					alert("error logging in " + _error.debug);
				})
			};


		}])

	.controller('MoneyCtrl', function($scope) {
		$scope.money = [
		{title: 'Copper', id:1}
		];
	})

	.controller('FeatsCtrl', function($scope) {
		$scope.feats = [
			{ title: 'Feat 1', id:1 }
		];
	})

	.controller('PlaylistCtrl', function($scope, $stateParams) {
	})

	/*
		Nic Put Controller's here
	*/

	/*
		Jacob Put Controller's here
	*/

	/*
		Phillip Put Controller's here
	*/

	/*
		Jake Put Controller's here
	*/

	/*
		Enda put Controller's here
	*/

	.controller('CharacterCtrl', function($scope, $stateParams) {
	});
