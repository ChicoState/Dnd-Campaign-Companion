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

            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {
                    // transition to next state
                    $state.go('app-login');
                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };


        }])
    .controller('CharacterCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.character = [];

            UserService.currentUser().then(function (_user) {
                var character = Parse.Object.extend("Character"),
                    query = new Parse.Query(character);

                $scope.user = _user;

                query.equalTo("username", $scope.user.attributes.username)

                query.find({
                    success: function (results){
                        var object = results[0];
                        //grab the first object because there SHOULD only be one
                        console.log(object)
                        $scope.character.push({
                            characterName: object.attributes.characterName,
                            race: object.attributes.race,
                            allignment: object.attributes.allignment,
                            class: object.attributes.class,
                            level: object.attributes.level,
                            strength: object.attributes.strength,
                            dexterity: object.attributes.dexterity,
                            constitution: object.attributes.constitution,
                            intelligence: object.attributes.intelligence,
                            wisdom: object.attributes.wisdom,
                            charisma: object.attributes.charisma,
                        });
                        console.log($scope.character[0]);
                    }
                });
            });

        }]);
