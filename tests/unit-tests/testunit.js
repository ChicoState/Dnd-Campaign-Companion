describe('LoginController', function() {

    var controller, 
        deferredLogin,
        userServiceMock,
        stateMock,
        ionicPopupMock;

    // load the module for our app
    beforeEach(module('starter'));
    
    // disable template caching
    beforeEach(module(function($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function(){} );
        $urlRouterProvider.deferIntercept();
    }));
    
    // instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, $q) {
        deferredLogin = $q.defer();
        
        // mock userService
        userServiceMock = {
            login: jasmine.createSpy('login spy')
                          .and.returnValue(deferredLogin.promise)           
        };
        
        // mock $state
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        
        // mock $ionicPopup
        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
        
        // instantiate LoginController
        controller = $controller('LoginController', { 
                        '$ionicPopup': ionicPopupMock, 
                        '$state': stateMock, 
                        'userService': userServiceMock }
                     );
    }));
    
    describe('#doLogin', function() {
        
        // call doLogin on the controller for every test
        beforeEach(inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
            controller.username = 'test1';
            controller.password = 'password1';
            controller.doLogin();
        }));
        
        it('should call login on userService', function() {
            expect(userServiceMock.login).toHaveBeenCalledWith('karmatest@test.com', 'karma'); 
        });
        
        describe('when the login is executed,', function() {
            it('if successful, should change state to tab.character', function() {
                
                deferredLogin.resolve();
                $rootScope.$digest();
                
                expect(stateMock.go).toHaveBeenCalledWith('tab.character');
            });
            
            it('if unsuccessful, should show a popup', function() {
                
                deferredLogin.reject();
                $rootScope.$digest();
                
                expect(ionicPopupMock.alert).toHaveBeenCalled();
            });
        });
    })
});