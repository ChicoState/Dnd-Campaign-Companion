describe('LoginController', function() {

    var controller, 
        deferredLogin,
        UserServiceMock,
        stateMock,
        ionicPopupMock;

    // TODO: Load the App Module

    // TODO: Instantiate the Controller and Mocks

    describe('#doLogin', function() {

        // TODO: Call doLogin on the Controller

        it('should call login on app', function() {
            expect(dinnerServiceMock.login).toHaveBeenCalledWith('karmatest@test.com', 'karma'); 
        });

        describe('when the login is executed,', function() {
            it('if successful, should change state to tab.character', function() {

                // TODO: Mock the login response from UserService

                expect(stateMock.go).toHaveBeenCalledWith('tab.character');
            });

            it('if unsuccessful, should show a popup', function() {

                // TODO: Mock the login response from UserService

                expect(ionicPopupMock.alert).toHaveBeenCalled();
            });
        });
    })
});