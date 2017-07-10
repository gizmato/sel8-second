module.exports = {
    beforeEach: function (client, done) {
        var self = this;
        client.waitForElementVisible("body");
        var testModule = require("./tests/" + client.currentTest.module);
        client.resizeWindow(1920, 1080);
    }
}