module.exports = {
    before: function (client, done) {
        this.adminMain = client.page.adminMain()
        this.adminLogin = client.page.adminLogin();
        this.countries = client.page.countries();
        var self = this;
        self.adminLogin.login('admin', 'admin', client, () => {
            self.adminMain.waitForElementVisible('@link', client.globals.myPause, () => {
                done();
            });
        });
    },

    after: function (client, done) {
        client.end();
        done();
    },

    'Countries List Sorting Check': function (client, done) {
        this.countries.countrySortingChecker(client);
    },
};