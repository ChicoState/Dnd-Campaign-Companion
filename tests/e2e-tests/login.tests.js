describe('Clicking on the login button ', function(){
	var username, password, loginButton;
	
	beforeEach(function() {
		browser.get('/#/login');
		username = element(by.model('vm.username'));
		password = element(by.model('vm.password'));
		loginButton = element(by.linkText('Log in'));
	});
	
	it('should validate the credentials for a successful login and display the Character view', function() {
		username.sendKeys('karmatest@test.com');
		password.sendKeys('karma');
		
		loginButton.click().then(function() {
			expect(browser.getLocationAbsUrl()).toMatch('/tab/character');
		});
	});
		
	it('should display a popup for an unsuccessful login', function() {
		username.sendKeys('thisshouldntwork');
		password.sendKeys('weeepassword');
	
		loginButton.click().then(function() {
			expect(browser.getLocationAbsUrl()).toMatch('/login');
	
			var popup = element(by.css('.popup-container.popup-showing.active'));
			expect(popup.isDisplayed()).toBeTruthy();
		});
	});
});