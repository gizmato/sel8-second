var customerMainCommands = {
    customerOpen: function (client, callback) {
        this.customer = client.page.customerMain();
        this.customer.navigate().waitForElementPresent('@homeButton', client.globals.myPause, () => {
            callback && callback();
        });
    },

    stickerCheck: function (sections, client, callback) {
        this.customer = client.page.customerMain();
        var self = this;
        var sectionsList = {
            MostPopular: 3,
            Campaigns: 4,
            LatestProducts: 5
        };
        var sectionsSelector = this.customer.elements.sections.selector + sectionsList[sections] + ') ';
        var ducksList = sectionsSelector + this.customer.elements.liDucks.selector;
        var oneSticker = this.customer.elements.theOnlySticker.selector;
        client.elements('css selector', ducksList, (ducks) => {
            console.log('There are: ' + ducks.value.length + ' Ducks found in the section ' + sections);
            for (var i = 0; i < ducks.value.length; i++) {
                var dNumber = i + 1;
                console.log('Checking duck #' + dNumber + '...');
                var theOneAndOnlySticker = ducksList + ':nth-child(' + dNumber + ') ' + oneSticker;
                console.log(theOneAndOnlySticker);
                this.customer.waitForElementVisible(theOneAndOnlySticker, client.globals.myPause);
            }
        });
        callback && callback();
    }
}

module.exports = {
    url: function () {
        return this.api.launchUrl + '/en/';
    },
    commands: [customerMainCommands],
    elements: {
        logo: 'div.logotype-wrapper > a > img',
        homeButton: 'i[title="Home"]',
        sections: 'div[id^=box]:nth-of-type(',
        liDucks:  'li.product',
        theOnlySticker: 'div.sticker:nth-of-type(1):nth-last-child(1)'
    }
};