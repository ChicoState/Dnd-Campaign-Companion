/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])
    .controller('ListCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.dataList = ["One", "Two", "Three"];


            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };


        }])
    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }])

    .controller('SpecialCtrl', [
        '$state', '$scope', 'UserService', '$ionicPopup',
	function ($state, $scope, UserService, $ionicPopup){
		UserService.currentUser().then(function(_user) {
			$scope.user = _user;
		});
		$scope.abil = [];
		$scope.feats = [];
		$scope.spells = [];
		
		$scope.addSpell = function() {
		    $scope.data = { }
		    var mypop =
			$ionicPopup.show({
			    template: 'Title: <input type="text" ng-model="data.title"> <br> Description: <textarea name="desc" cols="40" rows="5" maxlength="200" ng-model="data.description" style="height: 130px; min-height:130px; max-height:130px;">',
			    title: 'Add Spell',
			    cssClass: 'addAbil',
			    scope: $scope,
			    buttons: [
				{text: 'Cancel' },
				{text: 'Save',
				 type: 'button-positive',
				 onTap: function(e) {
					if((!$scope.data.title)||(!$scope.data.description)){
					    e.preventDefault();
					} else{
					    return $scope.data;
					}
				    }
				},
			    ]
			});
			mypop.then(function(res){
			    if(res){
				$scope.spells.push(res);
			    }
			});
		};
	}]
);

