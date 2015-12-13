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
    .controller('CombatCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };

            $scope.combatSave = function (_user) {
                UserService.currentUser().then(function (_user) {
                    $scope.user = _user;
                    $scope.save = [];
                    $scope.user = _user;
                    var stuff = Parse.Object.extend("Combat");
                    var query = new Parse.Query(stuff);
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
                            console.log(object)
                            object.save();
                            $state.go($state.current, {}, {});
                        }
                    });
                });
            }

            $scope.combat = [];
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
                var combat = Parse.Object.extend("Combat");
                var query = new Parse.Query(combat);

                query.equalTo("username", $scope.user.attributes.username)

                query.find({
                    success: function (results){
                        var object = results[0];
                        console.log(object)
                        $scope.combat.push({
                            HP: object.attributes.HP,
                            AC: object.attributes.AC,
                            Init: object.attributes.initiative,
                            Fort: object.attributes.Fortitude,
                            Reflex: object.attributes.Reflex,
                            Will: object.attributes.Will,
                            BaseA: object.attributes.BaseAttack,
                            Grapple: object.attributes.Grapple
                        });
                        console.log($scope.combat[0]);
                        $state.go($state.current, {}, {});
                    }
                });
            });

        }]);
