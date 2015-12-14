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























































































































































































































































































































































































































































































    .controller('InventoryCtrl', [
        '$state', '$scope', 'UserService', '$ionicPopup',
   function ($state, $scope, UserService, $ionicPopup){
       UserService.currentUser().then(function(_user) {
           $scope.user = _user;
       });
       $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };

            $scope.inventorySave = function (_user) {
                UserService.currentUser().then(function (_user) {
                    $scope.user = _user;
                    $scope.save = [];
                    var parameter = Parse.Object.extend("Inventory");
                    var query = new Parse.Query(parameter);
                    query.equalTo("username", $scope.user.attributes.username)
                    query.find({
                        success: function (results) {
                            var object = results[0];
                            console.log($scope);
                            object.set("HP", parseInt($scope.combat[0].HP, 10));
                            object.set("AC", parseInt($scope.combat[0].AC, 10));
                            object.set("initiative", parseInt($scope.combat[0].Init, 10));
                            object.set("Fortitude", parseInt($scope.combat[0].Fort, 10));
                            object.set("Reflex", parseInt($scope.combat[0].Reflex, 10));
                            object.set("Will", parseInt($scope.combat[0].Will, 10));
                            object.set("BaseAttack", parseInt($scope.combat[0].BaseA, 10));
                            object.set("Grapple", parseInt($scope.combat[0].Grapple, 10));
                            object.set("Attack", $scope.combat[0].Attack);
                            console.log(object)
                            object.save();
                            $state.go($state.current, {}, {});
                        }
                    });
                });
            };

       $scope.items = [];
       $scope.gear = [];
       
       
       $scope.shouldShowDelete = true;
       $scope.listCanSwipe = true; 
       
       $scope.itemadd = function(type) {
           $scope.data = {type}
           var mypop =
           $ionicPopup.show({
               template: 'Title: <input type="text" ng-model="data.title"> <br> Description: <textarea name="desc" cols="40" rows="5" maxlength="200" ng-model="data.description" style="height: 130px; min-height:130px; max-height:130px;">',
               title: 'Add Item',
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
               if(res.type == 1){
                   $scope.items.push(res);
               } else if(res.type==2){
                   $scope.gear.push(res);
               } 
               }   
           });
       };
   }]
);