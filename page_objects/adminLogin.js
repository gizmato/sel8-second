
var adminLoginCommands = {
    login: function (user, password, client, callback) {
        this.adminMain = client.page.adminMain();
        this.adminLogin = client.page.adminLogin();
        var self = this;
        self.adminLogin.navigate().waitForElementVisible('@loginInput', client.globals.myPause)
            .click('@loginInput')
            .sendKeys('@loginInput', 'admin')
            .waitForElementVisible('@pwdInput', client.globals.myPause)
            .sendKeys('@pwdInput', 'admin')
            .click('@loginButton')
            .waitForElementVisible('@logo', client.globals.myPause)
        callback && callback();
    }
}

module.exports = {
    url: function () {
        return this.api.launchUrl + '/admin';
    },
    commands: [adminLoginCommands],
    elements: {
        loginInput: '#box-login input[type="text"]',
        pwdInput: '#box-login input[type="password"]',
        loginButton: 'div.footer > button',
        logo: 'div.logotype img', //on another page actually
    }
};